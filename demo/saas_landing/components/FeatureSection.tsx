import {
  Sparkles,
  CheckCircle2,
  Megaphone,
  Globe2,
  LayoutGrid,
  Users,
} from "lucide-react";

const features = [
  {
    title: "AI Writing Assistant",
    description:
      "문맥을 파악하여 최적의 단어와 문장을 추천합니다. 막힌 문장을 시원하게 뚫어드립니다.",
    icon: Sparkles,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Perfect Grammar",
    description:
      "문법 오류 없는 완벽한 글을 작성하세요. 오타, 맞춤법, 띄어쓰기를 실시간으로 교정합니다.",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Brand Voice",
    description:
      "우리 브랜드만의 톤앤매너를 유지하세요. 일관된 목소리로 고객에게 다가갈 수 있습니다.",
    icon: Megaphone,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
  },
  {
    title: "50+ Languages",
    description:
      "전 세계 독자를 위해 50개 이상의 언어를 지원합니다. 글로벌 비즈니스를 위한 필수 도구입니다.",
    icon: Globe2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-600/10",
  },
  {
    title: "100+ Templates",
    description:
      "블로그, 이메일, 광고 카피 등 검증된 템플릿을 활용하여 작성 시간을 획기적으로 줄이세요.",
    icon: LayoutGrid,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
  },
  {
    title: "Real-time Collaboration",
    description:
      "팀원들과 실시간으로 함께 글을 작성하고 편집하세요. 코멘트와 제안 기능으로 협업이 쉬워집니다.",
    icon: Users,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            강력한 AI 글쓰기 도구
          </h2>
          <p className="text-lg text-muted-foreground">
            WriteFlow가 제공하는 다양한 기능으로 업무 효율을 극대화하세요.
            단순한 고정을 넘어 창작의 파트너가 됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
