"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";
import { supabase } from "@/lib/supabase";

type QuestionType = "single" | "compare";

type SubmitState = {
  kind: "idle" | "success" | "error";
  message: string;
};

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
  const [questionType, setQuestionType] = useState<QuestionType>("single");
  const [authorId, setAuthorId] = useState("");
  const [caption, setCaption] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const captionCount = useMemo(() => caption.length, [caption]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedAuthorId = authorId.trim();
    const trimmedCaption = caption.trim();

    if (!trimmedAuthorId) {
      setSubmitState({ kind: "error", message: "author_id 값을 입력해주세요." });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    const { error } = await supabase.from("questions").insert({
      author_id: trimmedAuthorId,
      type: questionType,
      caption: trimmedCaption || null,
      status: "active",
    });

    if (error) {
      setSubmitState({
        kind: "error",
        message: `저장 실패: ${error.message}`,
      });
      setIsSubmitting(false);
      return;
    }

    setSubmitState({
      kind: "success",
      message: "질문 메타데이터가 Supabase questions 테이블에 저장되었습니다.",
    });
    setCaption("");
    setIsSubmitting(false);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.badge}>DecisionONYOU Migration</div>
        <h1 className={styles.title}>결정장애ON YOU를 Next.js 기반으로 재구축하는 중입니다.</h1>
        <p className={styles.description}>
          현재 이 화면은 기존 단일 HTML 프로토타입을 실서비스형 구조로 옮기기 위한
          새 출발점입니다. 이번 단계에서는 질문 등록의 첫 연결로, 질문 메타데이터를
          Supabase `questions` 테이블에 저장하는 흐름을 붙였습니다.
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

      <section className={styles.formCard}>
        <div className={styles.formHeader}>
          <div>
            <div className={styles.sectionEyebrow}>Supabase 연결 테스트</div>
            <h2>질문 등록 메타데이터 저장</h2>
          </div>
          <p>
            아직 Auth를 붙이기 전이라 `author_id`는 임시로 직접 입력받습니다. 다음 단계에서
            실제 로그인 사용자 기반으로 바꿀 예정입니다.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>질문 타입</span>
            <select
              value={questionType}
              onChange={(event) => setQuestionType(event.target.value as QuestionType)}
            >
              <option value="single">BUY / PASS</option>
              <option value="compare">THIS / THAT</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>author_id (uuid)</span>
            <input
              value={authorId}
              onChange={(event) => setAuthorId(event.target.value)}
              placeholder="예: Supabase auth user id"
            />
          </label>

          <label className={styles.field}>
            <span>설명 / 캡션</span>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value.slice(0, 60))}
              placeholder="예: 지금 안 사면 후회할까?"
              rows={4}
            />
            <small>{captionCount} / 60</small>
          </label>

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "Supabase에 저장"}
          </button>

          {submitState.kind !== "idle" ? (
            <p
              className={
                submitState.kind === "success" ? styles.successMessage : styles.errorMessage
              }
            >
              {submitState.message}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
