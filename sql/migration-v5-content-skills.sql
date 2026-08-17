-- Portfolio V21: editable About + Skills/Tools.
-- Run in Supabase SQL Editor once. Existing projects/storage are untouched.

create extension if not exists pgcrypto;

create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ar text,
  category text not null default 'skill' check (category in ('skill','tool')),
  icon_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

drop trigger if exists skills_set_updated_at on public.skills;
create trigger skills_set_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.skills enable row level security;

-- Public portfolio can read the About section.
drop policy if exists "Site content is public" on public.site_content;
create policy "Site content is public"
on public.site_content for select
to anon, authenticated
using (true);

-- Visitors only see published skills. The admin can also see hidden ones.
drop policy if exists "Published skills are public" on public.skills;
create policy "Published skills are public"
on public.skills for select
to anon, authenticated
using (
  published = true
  or lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
);

-- Only the portfolio owner can mutate About content.
drop policy if exists "Admin inserts site content" on public.site_content;
create policy "Admin inserts site content"
on public.site_content for insert
to authenticated
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin updates site content" on public.site_content;
create policy "Admin updates site content"
on public.site_content for update
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin deletes site content" on public.site_content;
create policy "Admin deletes site content"
on public.site_content for delete
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

-- Only the portfolio owner can mutate skills/tools.
drop policy if exists "Admin inserts skills" on public.skills;
create policy "Admin inserts skills"
on public.skills for insert
to authenticated
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin updates skills" on public.skills;
create policy "Admin updates skills"
on public.skills for update
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin deletes skills" on public.skills;
create policy "Admin deletes skills"
on public.skills for delete
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

insert into public.site_content (section, content)
values (
  'about',
  $$
  {
    "en": {
      "lead": "I turn ideas into responsive mobile experiences that feel clear, useful, and polished.",
      "p1": "I am a Computer Science graduate and Flutter developer with hands-on experience in Flutter, Dart, Firebase Authentication, Cloud Firestore, REST APIs, Dio, Retrofit, Bloc/Cubit, Hive, and Git/GitHub.",
      "p2": "I enjoy solving technical problems, connecting applications to real backends, and continuously improving architecture and user experience.",
      "interests": [
        "Exploring new Flutter packages and tools",
        "Writing about what I learn while building",
        "Contributing to and reading open-source code"
      ],
      "quote": "Strive to build things that make a difference.",
      "quoteAuthor": "— Youssef Ali Kamal"
    },
    "ar": {
      "lead": "أحوّل الأفكار إلى تطبيقات موبايل متجاوبة، واضحة، عملية، ومصممة بعناية.",
      "p1": "أنا خريج علوم حاسب ومطور Flutter، لدي خبرة عملية في Flutter وDart وFirebase Authentication وCloud Firestore وREST APIs وDio وRetrofit وBloc/Cubit وHive وGit/GitHub.",
      "p2": "أستمتع بحل المشكلات التقنية، وربط التطبيقات بخدمات خلفية حقيقية، وتحسين معمارية المشروع وتجربة المستخدم باستمرار.",
      "interests": [
        "استكشاف حزم وأدوات Flutter الجديدة",
        "الكتابة عمّا أتعلمه أثناء البناء",
        "المساهمة في المشاريع مفتوحة المصدر وقراءة أكوادها"
      ],
      "quote": "اسعَ لبناء أشياء تُحدث فرقًا حقيقيًا.",
      "quoteAuthor": "— يوسف علي كمال"
    }
  }
  $$::jsonb
)
on conflict (section) do nothing;

-- Seed only when the skills table is still empty.
insert into public.skills (name, name_ar, category, sort_order)
select seed.name, seed.name_ar, seed.category, seed.sort_order
from (values
  ('Flutter','Flutter','skill',1),
  ('Dart','Dart','skill',2),
  ('Firebase Auth','Firebase Auth','skill',3),
  ('Cloud Firestore','Cloud Firestore','skill',4),
  ('REST APIs','REST APIs','skill',5),
  ('Dio','Dio','skill',6),
  ('Retrofit','Retrofit','skill',7),
  ('Bloc / Cubit','Bloc / Cubit','skill',8),
  ('Hive','Hive','skill',9),
  ('Git & GitHub','Git & GitHub','skill',10),
  ('VS Code','VS Code','tool',1),
  ('Android Studio','Android Studio','tool',2),
  ('Postman','Postman','tool',3),
  ('Figma','Figma','tool',4)
) as seed(name, name_ar, category, sort_order)
where not exists (select 1 from public.skills);
