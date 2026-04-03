import styles from "./page.module.css";

const coreFeatures = [
  "질문 등록 (BUY/PASS, THIS/THAT)",
  "이미지 업로드 기반 카드 피드",
  "댓글 / 신고 / 관리자 최소 구조",
  "Supabase 연동을 위한 서버 중심 전환 준비",
];

const migrationSteps = [
  {
    title: "홈 피드 재구성",
    description: "기존 카드형 소비 경험을 Next.js 홈 화면으로 옮깁니다.",
  },
  {
    title: "질문 등록 흐름 이관",
    description: "ASK 화면을 새 구조로 옮기고 이미지 업로드 구조를 정리합니다.",
  },
  {
    title: "Supabase 연결",
    description: "인증, DB, 스토리지를 붙여 멀티유저 구조로 전환합니다.",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.badge}>DecisionONYOU Migration</div>
        <h1 className={styles.title}>결정장애ON YOU를 Next.js 기반으로 재구축하는 중입니다.</h1>
        <p className={styles.description}>
          현재 이 화면은 기존 단일 HTML 프로토타입을 실서비스형 구조로 옮기기 위한
          새 출발점입니다. 다음 단계에서는 홈 피드, 질문 등록, 인증, 이미지 업로드를
          순서대로 이관합니다.
        </p>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>이번 재구축의 핵심</h2>
          <ul>
            {coreFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h2>다음 구현 순서</h2>
          <div className={styles.steps}>
            {migrationSteps.map((step, index) => (
              <div key={step.title} className={styles.stepItem}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
