-- DecisionONYOU initial Supabase schema draft

create table if not exists profiles (
  id uuid primary key,
  nickname text not null unique,
  gender text,
  age integer,
  mbti text,
  role text default 'user' not null,
  created_at timestamptz default now() not null
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null,
  type text not null check (type in ('single', 'compare')),
  caption text,
  status text default 'active' not null,
  created_at timestamptz default now() not null
);

create table if not exists question_images (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null,
  image_order integer not null check (image_order in (1, 2)),
  storage_path text not null,
  created_at timestamptz default now() not null
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null,
  user_id uuid not null,
  pick smallint not null check (pick in (1, 2)),
  created_at timestamptz default now() not null,
  unique (question_id, user_id)
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null,
  author_id uuid not null,
  content text not null,
  status text default 'active' not null,
  created_at timestamptz default now() not null
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null,
  reporter_id uuid not null,
  reason text not null,
  status text default 'open' not null,
  created_at timestamptz default now() not null
);

create table if not exists admin_notices (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  active boolean default true not null,
  created_at timestamptz default now() not null
);

create table if not exists banned_words (
  id uuid primary key default gen_random_uuid(),
  word text not null unique,
  active boolean default true not null,
  created_at timestamptz default now() not null
);
