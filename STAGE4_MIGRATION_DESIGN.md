# DecisionONYOU 4단계 실행 결과 — Supabase + Next.js 마이그레이션 설계

## 1. 목표
기존 정적 프로토타입(`index.html`, `styles.css`, `app.js`)을 **Next.js + Supabase 기반 실서비스 구조**로 전환하기 위한 실제 설계안을 정의한다.

이번 단계의 초점은 다음과 같다.
- 현재 기능을 새 구조에서 어떻게 분해할지
- 어떤 페이지/컴포넌트/데이터 모델로 옮길지
- 인증, 이미지 업로드, 투표, 댓글, 신고 흐름을 어떻게 설계할지

---

## 2. 전환 원칙

### 원칙 1 — 기존 앱의 핵심 루프를 유지한다
유지할 핵심 루프:
1. 질문 등록
2. 피드 소비
3. BUY/PASS 또는 THIS/THAT 투표
4. 댓글
5. 신고

### 원칙 2 — 프로토타입 편의 기능은 과감히 단순화한다
단순화 대상:
- 로컬 세션 큐
- 로컬 관리자 통계 UI
- 로컬 경고/차단 로직
- 복잡한 반복 모드

### 원칙 3 — 클라이언트 저장 상태를 서버 중심 구조로 옮긴다
- localStorage 중심 상태를 DB 중심으로 전환
- 관리자 기능은 권한 계층 뒤로 이동

---

## 3. Next.js 기준 페이지 구조 설계

###[public]
### `/`
- 홈 피드
- 최신 질문 또는 추천 질문 피드 노출
- 질문 카드, 투표, 댓글 진입

### `/ask`
- 질문 등록 페이지
- 질문 타입 선택(single / compare)
- 이미지 업로드
- 캡션 입력

### `/question/[id]`
- 질문 상세 페이지
- 이미지, 설명, 투표 결과, 댓글, 신고

### `/login`
- 로그인/가입
- 이메일 또는 소셜 로그인(추후 선택)

### `/me`
- 내 프로필
- 내 질문 목록
- 내 참여 기록

###[admin]
### `/admin`
- 최소 관리자 대시보드
- 신고 목록
- 공지 관리
- 금지어 관리

초기 버전에서는 관리자 통계 화면은 생략 가능

---

## 4. 컴포넌트 구조 초안

### 공통 레이아웃
- `AppShell`
- `BottomNav`
- `TopBar`

### 질문 관련
- `QuestionCard`
- `QuestionComposer`
- `QuestionTypeToggle`
- `QuestionImageUploader`
- `VoteBar`
- `VoteResultBar`

### 댓글/신고
- `CommentList`
- `CommentComposer`
- `ReportButton`
- `ReportModal`

### 사용자
- `ProfileSummary`
- `MyQuestionList`
- `MyVoteList`

### 관리자
- `AdminReportList`
- `AdminNoticeEditor`
- `AdminBannedWordEditor`

---

## 5. Supabase 데이터 모델 설계

### `profiles`
사용자 프로필 정보
- `id` (uuid, auth.users 참조)
- `nickname`
- `gender`
- `age_range` 또는 `age`
- `mbti`
- `created_at`

### `questions`
질문 본문 및 메타 정보
- `id` (uuid)
- `author_id`
- `type` (`single` | `compare`)
- `caption`
- `status` (`active` | `hidden` | `reported` | `deleted`)
- `created_at`

### `question_images`
질문 이미지 저장
- `id`
- `question_id`
- `image_order` (1, 2)
- `storage_path`
- `public_url` 또는 path 기반 조회

### `votes`
질문별 투표
- `id`
- `question_id`
- `user_id`
- `pick` (`1` | `2`)
- `created_at`

제약:
- 한 사용자당 한 질문에 1회 투표

### `comments`
- `id`
- `question_id`
- `author_id`
- `content`
- `status`
- `created_at`

### `reports`
- `id`
- `question_id`
- `reporter_id`
- `reason`
- `status` (`open` | `resolved` | `dismissed`)
- `created_at`

### `admin_notices`
- `id`
- `content`
- `active`
- `created_at`

### `banned_words`
- `id`
- `word`
- `active`
- `created_at`

---

## 6. 인증 구조 설계

### 권장 방식
- Supabase Auth 사용
- 초기에는 이메일 매직링크 또는 이메일/비밀번호 중 하나 선택
- 프로필은 회원가입 직후 별도 입력

### 사용자 흐름
1. 로그인/가입
2. 첫 진입 시 프로필 작성
3. 이후 질문 등록/댓글/투표 가능

### 장점
- 기존 프로토타입의 가짜 비밀번호 구조 제거
- 사용자 식별을 실제 계정 기반으로 전환 가능

---

## 7. 이미지 업로드 구조 설계

### 방식
- 질문 생성 시 Supabase Storage에 이미지 업로드
- 업로드 성공 후 `question_images`에 메타 저장

### 흐름
1. 사용자가 이미지 선택
2. 클라이언트에서 업로드
3. 업로드 path 반환
4. 질문/이미지 메타 저장

### 주의
- compare 타입은 이미지 2장 필수
- single 타입은 이미지 1장 필수

---

## 8. 투표 구조 설계

### 핵심 정책
- 로그인 사용자만 투표 가능
- 한 질문당 1회 투표
- 결과는 집계로 노출

### 구현 방식
- votes 테이블에 한 줄 저장
- 질문 상세 또는 피드 조회 시 집계 쿼리 사용

### 장점
- localStorage 투표 상태 제거 가능
- 멀티유저 반영 가능

---

## 9. 댓글 구조 설계

### 정책
- 로그인 사용자만 댓글 작성
- 욕설/금칙어 필터 적용
- 상태값으로 숨김 처리 가능

### 구현 방식
- comments 테이블 기준 조회
- 질문 상세 페이지 또는 모달에서 렌더링

---

## 10. 신고 / 관리자 구조 설계

### 신고
- 질문 단위 신고부터 시작
- 초기에는 게시물 신고만 구현
- 댓글 신고는 후순위

### 관리자
- 관리자 권한은 별도 체크 필요
- 예: `profiles.role = 'admin'`

### 관리자 기능 최소 범위
1. 신고 목록 조회
2. 신고 상태 변경
3. 공지 작성
4. 금지어 관리

---

## 11. 기존 프로토타입 기능 매핑

### 그대로 유지할 개념
- BUY/PASS
- THIS/THAT
- 질문 타입 전환
- 하단 네비게이션 감성
- 질문 카드 중심 UI

### 새 구조에서 바뀌는 것
- 로컬 저장 → DB 저장
- 가짜 로그인 → 실제 로그인
- 프론트 관리자 → 권한 기반 관리자
- 단일 파일 UI → 페이지/컴포넌트 구조

---

## 12. 마이그레이션 순서 제안

### 1차 구현
- Next.js 앱 골격
- 공통 레이아웃
- 홈 / 질문등록 / 내페이지 기본 화면

### 2차 구현
- Supabase Auth
- profiles
- questions
- question_images

### 3차 구현
- votes
- comments
- reports

### 4차 구현
- admin_notices
- banned_words
- 관리자 화면 최소 기능

---

## 13. 이번 단계의 결정 사항
1. 프론트엔드는 Next.js로 재구축
2. 백엔드는 Supabase 중심으로 설계
3. 핵심 페이지 구조 확정
4. 핵심 데이터 모델 초안 확정
5. 실서비스용 핵심 흐름 정의 완료

---

## 14. 4단계 완료 판정
완료한 작업:
- 페이지 구조 설계 완료
- 컴포넌트 구조 초안 완료
- DB 모델 초안 완료
- 인증/스토리지/투표/댓글/신고 흐름 설계 완료
- 마이그레이션 순서 정의 완료

판정:
- **4단계 완료**
