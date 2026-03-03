import { NextResponse } from "next/server";
import { pc, indexName } from "@/lib/pinecone";
import { supabase } from "@/lib/supabase";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import Papa from "papaparse";
import fs from "fs";
import path from "path";

// Pinecone Inference Model (Native Embedding)
// Note: LangChain @langchain/pinecone doesn't directly expose all Inference API models easily in some versions,
// so we might need to handle the embedding through Pinecone's inference if LangChain wrappers lag behind.
// However, the user specifically asked for llama-text-embed-v2.

export async function POST() {
  try {
    const csvFilePath = path.join(process.cwd(), "samples", "review.csv");
    const fileContent = fs.readFileSync(csvFilePath, "utf8");

    // 1. Parse CSV for Supabase (Structured Metadata)
    const { data: records, errors } = Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      console.error("CSV Parsing Errors:", errors);
    }

    // 2. Load documents for LangChain/Pinecone
    const loader = new CSVLoader(csvFilePath);
    const docs = await loader.load();

    // Attach metadata to docs (for better retrieval/filtering if needed)
    const enhancedDocs = docs.map((doc, index) => {
      const record = (records as any[])[index];
      return {
        ...doc,
        metadata: {
          ...doc.metadata,
          id: record.id,
          rating: record.rating,
          title: record.title,
          author: record.author,
          date: record.date,
          helpful_votes: record.helpful_votes,
          verified_purchase: record.verified_purchase,
        },
      };
    });

    // 3. Sync with Supabase (Optional but good for complete state)
    const { error: supabaseError } = await supabase
      .from("reviews")
      .upsert(records);

    if (supabaseError) {
      console.warn("Supabase Sync Error:", supabaseError.message);
    }

    // 4. Index to Pinecone
    const index = pc.Index(indexName);

    // Pinecone llama-text-embed-v2 has a limit of 96 inputs per request.
    const BATCH_SIZE = 90;
    const allVectors: any[] = [];

    for (let i = 0; i < enhancedDocs.length; i += BATCH_SIZE) {
      const batchDocs = docs.slice(i, i + BATCH_SIZE);
      const batchEnhancedDocs = enhancedDocs.slice(i, i + BATCH_SIZE);

      // Using Pinecone Inference for embedding (batched)
      const embeddings = await pc.inference.embed({
        model: "llama-text-embed-v2",
        inputs: batchDocs.map((d) => d.pageContent),
        parameters: { inputType: "passage", truncate: "END" },
      });

      const batchVectors = batchEnhancedDocs.map((doc, j) => {
        const embedding = embeddings.data[j] as any;
        const values = embedding.values;

        if (!values) {
          throw new Error(`No values found in embedding for document ${i + j}`);
        }

        return {
          id: `review-${doc.metadata.id}`,
          values: values,
          metadata: doc.metadata as any,
        };
      });

      allVectors.push(...batchVectors);
    }

    // Upsert in batches as well for stability
    for (let i = 0; i < allVectors.length; i += BATCH_SIZE) {
      const batch = allVectors.slice(i, i + BATCH_SIZE);
      await index.upsert({ records: batch });
    }

    return NextResponse.json({
      success: true,
      message: `${allVectors.length} reviews indexed successfully in batches`,
      count: allVectors.length,
    });
  } catch (error: any) {
    console.error("Indexing Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
