import { NextRequest, NextResponse } from "next/server";
import { pc, indexName } from "@/lib/pinecone";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const index = pc.Index(indexName);

    // 1. Embed the query using llama-text-embed-v2 (Native Pinecone Inference)
    const queryEmbedding = await pc.inference.embed({
      model: "llama-text-embed-v2",
      inputs: [message],
      parameters: { inputType: "query", truncate: "END" },
    });

    const vectorValues = (queryEmbedding.data[0] as any).values;
    if (!vectorValues) {
      throw new Error("No values found in query embedding");
    }

    // 2. Query Pinecone for similar reviews
    const queryResponse = await index.query({
      vector: vectorValues,
      topK: 5,
      includeMetadata: true,
    });

    const relevantReviews = queryResponse.matches.map((match) => ({
      content: match.metadata?.content,
      title: match.metadata?.title,
      rating: match.metadata?.rating,
      author: match.metadata?.author,
      score: match.score,
      id: match.metadata?.id,
    }));

    // 3. Generate Summary using OpenAI gpt-5-nano via LangChain
    const llm = new ChatOpenAI({
      modelName: "gpt-5-nano",
      temperature: 0.7,
      openAIApiKey: process.env.OPEN_AI_APIKEY || process.env.OPENAI_API_KEY,
    });

    const prompt = PromptTemplate.fromTemplate(`
당신은 쇼핑몰의 전문 리뷰 분석가입니다. 
제공된 [리뷰 데이터]를 바탕으로 사용자의 [질문]에 대해 친절하고 전문적으로 답변해주세요.

[리뷰 데이터]:
{context}

[질문]:
{question}

답변은 한국어로 작성하며, 다음 원칙을 지켜주세요:
1. 리뷰의 톤(긍정/부정)을 잘 파악하여 종합적으로 요약하세요.
2. 특정 리뷰의 구체적인 내용이 있다면 인용하여 신뢰도를 높이세요.
3. 데이터가 부족하다면 솔직하게 말하고 일반적인 가이드를 제공하세요.
4. 마지막에는 구매 결정에 도움이 될 만한 한 줄 팁을 제공하세요.
`);

    const chain = prompt.pipe(llm).pipe(new StringOutputParser());

    const contextString = relevantReviews
      .map(
        (r, i) =>
          `리뷰 ${i + 1}: [평점 ${r.rating}] "${r.title}" - ${r.content}`,
      )
      .join("\n\n");

    const summary = await chain.invoke({
      context: contextString,
      question: message,
    });

    return NextResponse.json({
      success: true,
      data: relevantReviews,
      summary: summary,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
