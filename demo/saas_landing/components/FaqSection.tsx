"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "무료 체험 기간은 얼마나 되나요?",
    answer:
      "가입 후 첫 14일 동안 Pro 플랜의 모든 기능을 무료로 체험하실 수 있습니다. 체험 기간이 끝나기 전에 결제 정보가 입력되지 않으면 자동으로 Free 플랜으로 전환됩니다.",
  },
  {
    question: "언제든지 취소할 수 있나요?",
    answer:
      "네, 언제든지 월간 또는 연간 구독을 취소하실 수 있습니다. 취소 시 다음 결제 주기가 시작될 때까지 현재 플랜의 기능에 계속 액세스하실 수 있습니다.",
  },
  {
    question: "제 데이터는 안전한가요?",
    answer:
      "당사는 최신 업계 표준 암호화 기술을 사용하여 고객님의 데이터를 안전하게 보관합니다. 작성하신 글과 데이터는 모델 학습에 무단으로 사용되지 않습니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer:
      "연간 플랜 결제 후 7일 이내에 환불을 요청하시면 전액 환불해 드립니다. 월간 플랜의 경우 당월 환불은 불가하나 원하실 때 즉시 구독을 해지하실 수 있습니다.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
          자주 묻는 질문
        </h2>

        <Accordion.Root type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl bg-card overflow-hidden data-[state=open]:border-primary/50 transition-colors"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between py-5 px-6 font-medium text-left text-foreground transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-6 pb-5 pt-0 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
