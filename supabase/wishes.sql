create table public.wishes (
  id uuid primary key default gen_random_uuid(),
  name varchar(60) not null check (char_length(trim(name)) between 2 and 60),
  message varchar(300) not null check (char_length(trim(message)) between 2 and 300),
  is_approved boolean not null default true,
  created_at timestamptz not null default now()
);

create index wishes_approved_created_at_idx on public.wishes (is_approved, created_at desc);

alter table public.wishes enable row level security;
revoke all on public.wishes from anon, authenticated;
