상황:
스티치에서 만든 랜딩 페이지 시안을 기준으로
Next.js 16 + TypeScript + Tailwind CSS로 실제 서비스 가능한 랜딩 페이지를 구현해야 함.
(반응형, 접근성, 성능, SEO 포함)

[Task]
아래 요구사항을 만족하는 SaaS 랜딩 페이지를 구현해줘.

- 경로: `/` (메인 랜딩)
- 섹션: Hero / Features / Pricing / FAQ / CTA / Footer
- 한국어 카피 적용
- 데스크톱/모바일 반응형 완성
- 다크모드 없이 라이트 테마 기준으로 구현

[Context]

- 스택: Next.js 16(App Router), TypeScript, Tailwind CSS
- 디자인 톤: 모던/깔끔, 신뢰감 있는 B2B SaaS 스타일
- 브랜드 컬러: `blue-600` 계열, 중립 배경 `slate/gray` 계열
- 아이콘: `lucide-react`
- 애니메이션: 과하지 않게 `Framer Motion`으로 진입 애니메이션만 적용
- 성능 제약:
  - LCP 요소 최적화
  - 이미지 `next/image` 사용
  - 불필요한 클라이언트 컴포넌트 최소화
- 접근성 제약:
  - 시맨틱 태그 사용
  - 키보드 포커스/aria 속성 기본 준수
- SEO 제약:
  - 메타 타이틀/디스크립션
  - Open Graph 기본값 설정

[Reference]
다음 파일/자산을 참고해서 구현해줘.

- `design/landing-desktop.png`
- `design/landing-mobile.png`
- `app/layout.tsx` (현재 메타/폰트 설정)
- `components/ui/*` (기존 UI 컴포넌트 스타일)
- `tailwind.config.ts` (테마 토큰)

시안 구조/간격/위계는 최대한 유지하되, 실제 웹 접근성/반응형에 맞게 합리적으로 보정해줘.

[Evaluate]
아래 체크리스트 기준으로 자체 점검해줘.

1. 시안 재현도: 레이아웃 위계/간격/타이포가 시안과 일치하는가
2. 반응형: 375px, 768px, 1280px에서 레이아웃 붕괴가 없는가
3. 접근성: 랜드마크/헤딩 구조/버튼 라벨이 명확한가
4. 성능: 불필요한 클라이언트 렌더링과 대용량 리소스가 없는가
5. 유지보수성: 섹션이 컴포넌트 단위로 분리되어 재사용 가능한가

[Output]
다음 형식으로 결과를 출력해줘.

1. 변경 파일 목록
2. 섹션별 구현 요약
3. 핵심 코드
4. 반응형/접근성 체크 결과
5. 실행 방법 및 검증 방법 (`npm run dev`, 확인 URL)
6. 후속 개선 아이디어(선택)

[Iterate]
1차 구현 후 아래 개선을 반영해 2차 개선해줘.

- Hero CTA 클릭률을 높이기 위한 문구 A/B 2안 제시
- Pricing 카드 강조(추천 플랜) 시각적 대비 강화
- 모바일에서 FAQ 인터랙션(아코디언) 터치 영역 확대
- Lighthouse 기준 SEO/접근성에 불리한 부분이 있으면 수정
