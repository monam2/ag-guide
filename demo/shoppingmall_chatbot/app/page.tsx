/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element, @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

export default function Home() {
  const [isChatActive, setIsChatActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isIndexing, setIsIndexing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; content: string; data?: any[] }[]
  >([]);

  const handleIndex = async () => {
    setIsIndexing(true);
    try {
      const res = await fetch("/api/index", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`${data.count}개의 리뷰가 성공적으로 인덱싱되었습니다.`);
      } else {
        alert(`인덱싱 실패: ${data.error}`);
      }
    } catch (error) {
      alert("인덱싱 중 오류가 발생했습니다.");
    } finally {
      setIsIndexing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, presetText?: string) => {
    if (e) e.preventDefault();
    const text = presetText || inputText;
    if (text.trim()) {
      setIsLoading(true);
      setIsChatActive(true);
      setChatHistory((prev) => [...prev, { role: "user", content: text }]);
      setInputText("");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        if (data.success) {
          setChatHistory((prev) => [
            ...prev,
            { role: "ai", content: data.summary, data: data.data },
          ]);
        }
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shrink-0 z-10 w-full">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 text-slate-900 dark:text-slate-100 cursor-pointer"
            onClick={() => {
              setIsChatActive(false);
              setChatHistory([]);
              setInputText("");
            }}
          >
            <div className="text-primary size-8 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="material-symbols-outlined text-2xl">
                reviews
              </span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">
              리뷰 AI
            </h2>
          </div>
          <button
            onClick={handleIndex}
            disabled={isIndexing}
            className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-lg ${isIndexing ? "animate-spin" : ""}`}
            >
              {isIndexing ? "sync" : "database"}
            </span>
            {isIndexing ? "인덱싱 중..." : "샘플 데이터 인덱싱"}
          </button>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a
              className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors"
              href="#"
            >
              대시보드
            </a>
            <a
              className="text-slate-900 dark:text-slate-100 text-sm font-medium transition-colors"
              href="#"
            >
              히스토리
            </a>
            <a
              className="text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium transition-colors"
              href="#"
            >
              설정
            </a>
          </nav>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-slate-800"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfmx91pK-L6bozWgmAMDtH6-nR08MIwQ5bp7czlNWYqZ10kVvBdG36zTQb2yqpusbMSdmLBbzxTcgdd7F_DVEYb58CDhPt739kBmgDJAaSs9OqBChmWxEzOmNSl33W6QrCGGjZZKTTb-vbEyWwnszSRDrrIS1OlivGxLf7j8h6eWLb8hhgK21cGzk5kOEW6YRQ_6ITOhG11dH-7tLLsuVldU_7IWZd1yl8EpSu-7u6XjwsyE9UbWpI_BTSsc-i2FLg-mVds9iQrR4")`,
            }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative w-full items-center justify-center">
        <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full lg:w-2/3 xl:w-3/4 mx-auto">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-40">
            {!isChatActive ? (
              // Welcome State
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[60vh]">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-4xl">
                    reviews
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                  어떤 상품의 리뷰가 궁금하신가요?
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                  상단 버튼으로 <strong>샘플 데이터를 인덱싱</strong>한 후
                  질문해 보세요. 수천 개의 리뷰를 분석하여 핵심 정보를 요약해
                  드립니다.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                  <button
                    onClick={(e) =>
                      handleSubmit(
                        e as any,
                        "BaristaPro 에스프레소 메이커 리뷰 요약해줘",
                      )
                    }
                    className="p-4 text-left border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary/50 transition-colors group bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        coffee_maker
                      </span>
                      <span className="font-semibold text-sm">
                        BaristaPro 에스프레소 메이커
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      제품의 주요 장단점과 사용자들의 전반적인 평가를
                      분석합니다.
                    </p>
                  </button>
                  <button
                    onClick={(e) =>
                      handleSubmit(
                        e as any,
                        "소음이 적은 블루투스 키보드 추천해줘",
                      )
                    }
                    className="p-4 text-left border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary/50 transition-colors group bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        keyboard
                      </span>
                      <span className="font-semibold text-sm">
                        저소음 블루투스 키보드
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      사무실에서 사용하기 좋은 타건감과 소음 관련 리뷰를
                      요약합니다.
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              // Active Conversation State
              <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 w-full ${chat.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`size-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                        chat.role === "ai"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                          : "border-2 border-white dark:border-slate-800 overflow-hidden"
                      }`}
                    >
                      {chat.role === "ai" ? (
                        <span className="material-symbols-outlined text-xl">
                          smart_toy
                        </span>
                      ) : (
                        <img
                          alt="User"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnPVZbwGWERRYeESg6yq4hUaEU5sYJ3KLsK3rktJ7lFBPbKDoHAIcZ-F8r5DhO3Vr7Qm8VjZh3mL-1Id1UJvV2PJ59THuEgbxINhyzlPrOm6xWsmWGL1QdFd90duRl0ro3JL3IZ8RacTOtrzWHTmfTlOiVO5Q9r5u2C9XpQTo5OquLCFMtvZw4FFN6GMUKNlexftRWuDZttxwF7VWuk6rG-2UTPv1PQ_AdVL4TO_PwM-aY2_TBXECXCUoe9fKeZPMdAE3oEH4K-Jg"
                        />
                      )}
                    </div>
                    <div
                      className={`flex flex-col gap-2 w-full max-w-[85%] ${chat.role === "user" ? "items-end" : ""}`}
                    >
                      <div
                        className={`flex items-baseline gap-2 ${chat.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {chat.role === "ai" ? "리뷰 AI" : "나"}
                        </span>
                        <span className="text-xs text-slate-400">방금 전</span>
                      </div>

                      <div
                        className={`rounded-2xl px-5 py-3 shadow-md text-[15px] leading-relaxed ${
                          chat.role === "user"
                            ? "bg-primary text-white rounded-tr-sm"
                            : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm"
                        }`}
                      >
                        {chat.content}
                      </div>

                      {chat.role === "ai" && chat.data && (
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold text-slate-500 mb-3 ml-1">
                            참고 리뷰
                          </h4>
                          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            {chat.data.map((item, idx) => (
                              <div
                                key={idx}
                                className="snap-start shrink-0 w-64 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-primary/50 cursor-pointer transition-colors group"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex text-amber-400 text-xs">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span
                                        key={i}
                                        className={`material-symbols-outlined text-[14px] ${i < item.rating ? "filled" : ""}`}
                                      >
                                        star
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    Store
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-2 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                                  "{item.title}" - {item.content}
                                </p>
                                <div className="flex items-center gap-2 mt-auto">
                                  <div className="size-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                                    {item.author?.[0] || "U"}
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-500">
                                    {item.author}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4 w-full">
                    <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 text-white shadow-lg animate-pulse">
                      <span className="material-symbols-outlined text-xl">
                        smart_toy
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm flex items-center gap-2">
                      <div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="size-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fixed Input Area */}
          <div className="absolute bottom-0 left-0 w-full bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 md:px-8 md:py-5 z-20">
            <div className="max-w-4xl mx-auto relative w-full">
              <form
                className="flex gap-3 items-end w-full"
                onSubmit={handleSubmit}
              >
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all flex items-end shadow-sm">
                  <textarea
                    className="w-full bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-0 resize-none py-3 px-4 max-h-32 min-h-[52px] outline-none"
                    placeholder="상품 URL이나 리뷰 관련 질문을 입력해주세요..."
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        if (e.nativeEvent.isComposing) return;
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                  ></textarea>
                </div>
                <button
                  disabled={isLoading}
                  className="bg-primary hover:bg-blue-600 text-white p-3 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center h-[52px] w-[52px] shrink-0 disabled:opacity-50"
                  type="submit"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
              <p className="text-center text-xs text-slate-400 mt-3">
                AI가 작성한 요약은 일부 부정확할 수 있습니다. 중요 정보는 원본
                리뷰를 함께 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
