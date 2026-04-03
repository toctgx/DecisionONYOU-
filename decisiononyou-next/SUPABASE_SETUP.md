# Supabase Setup

## 1. 환경변수
프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 채웁니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 2. 기본 클라이언트
- `src/lib/supabase.ts`에서 클라이언트를 생성합니다.
- 실제 키를 넣기 전까지는 placeholder 값으로 동작합니다.

## 3. 스키마 초안
- `supabase/schema.sql`에 초기 테이블 초안을 작성해두었습니다.
- 추후 Supabase SQL Editor 또는 migration으로 적용할 수 있습니다.

## 4. 다음 연결 대상
- Auth: 로그인/가입
- Database: profiles, questions, votes, comments, reports
- Storage: question_images 업로드 버킷

## 5. 주의
- 실제 서비스 전에는 RLS 정책을 반드시 추가해야 합니다.
- 현재 schema.sql은 초기 초안이며, 제약/외래키/RLS는 다음 단계에서 보강해야 합니다.
