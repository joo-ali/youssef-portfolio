-- Run this entire file in Supabase: SQL Editor > New query > Run.
-- The only account allowed to change portfolio content is yo231415@gmail.com.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_ar text,
  slug text not null unique,
  short_description text not null default '',
  short_description_ar text,
  description text,
  description_ar text,
  role text,
  role_ar text,
  challenge text,
  challenge_ar text,
  result text,
  result_ar text,
  technologies text[] not null default '{}',
  technologies_ar text[] not null default '{}',
  cover_url text,
  gallery_urls text[] not null default '{}',
  embed_url text,
  live_url text,
  github_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
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

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects for select
to anon, authenticated
using (
  published = true
  or lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
);

drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects"
on public.projects for insert
to authenticated
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects"
on public.projects for update
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects"
on public.projects for delete
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Portfolio media is public" on storage.objects;
create policy "Portfolio media is public"
on storage.objects for select
to public
using (bucket_id = 'portfolio-media');

drop policy if exists "Admin uploads portfolio media" on storage.objects;
create policy "Admin uploads portfolio media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
);

drop policy if exists "Admin updates portfolio media" on storage.objects;
create policy "Admin updates portfolio media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
)
with check (
  bucket_id = 'portfolio-media'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
);

drop policy if exists "Admin deletes portfolio media" on storage.objects;
create policy "Admin deletes portfolio media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and lower(coalesce(auth.jwt() ->> 'email', '')) = 'yo231415@gmail.com'
);

-- Starter content. Re-running this block will not duplicate rows because slug is unique.
insert into public.projects (title, slug, short_description, description, role, technologies, featured, published, sort_order)
values
(
  'WeddWish',
  'weddwish',
  'A Flutter and web platform that helps couples organize gifts and share a personalized public profile.',
  'A graduation platform combining a Flutter application, responsive web experience, authentication, storage, API integration, and shareable profiles.',
  'Flutter developer working across authentication, backend integration, storage, user flows, and mobile UI.',
  array['Flutter','Dart','Strapi','Supabase','JWT','REST API'],
  true, true, 1
),
(
  'Lift Log',
  'lift-log',
  'A fitness application where I handled authentication, routing, user data flow, and core project foundations.',
  'A collaborative Flutter fitness project designed around organized workout tracking and maintainable application flows.',
  'Responsible for login, registration, routing, user model preparation, and base project structure.',
  array['Flutter','Dart','Firebase','Cubit'],
  true, true, 2
),
(
  'Meals App',
  'meals-app',
  'A Firebase-connected mobile application with authentication, profiles, favorites, and cloud data.',
  'A practical Flutter project demonstrating cloud authentication, Firestore document mapping, favorites, and UI state handling.',
  'Flutter developer.',
  array['Flutter','Firebase Authentication','Cloud Firestore'],
  true, true, 3
)
on conflict (slug) do nothing;

-- Arabic starter content used by the EN / AR language switcher.
update public.projects
set title_ar = 'ويد ويش',
    short_description_ar = 'منصة Flutter وويب تساعد المقبلين على الزواج في تنظيم الهدايا ومشاركة ملف شخصي مخصص.',
    description_ar = 'منصة تخرج تجمع بين تطبيق Flutter وموقع ويب متجاوب، مع المصادقة والتخزين وربط الـ API والملفات الشخصية القابلة للمشاركة.',
    role_ar = 'مطور Flutter مسؤول عن المصادقة وربط الـ backend والتخزين وتدفقات المستخدم وواجهة الموبايل.',
    challenge_ar = 'كان المطلوب ربط مستخدمي الموبايل والويب من خلال ملف شخصي وتدفق هدايا واضح، مع الحفاظ على اتساق المصادقة والبيانات.',
    result_ar = 'تجربة مترابطة بين الموبايل والويب تشمل ملفات قابلة للمشاركة ومصادقة آمنة ومحتوى يعتمد على الـ backend.',
    technologies_ar = array['Flutter','Dart','Strapi','Supabase','JWT','REST API']
where slug = 'weddwish';

update public.projects
set title_ar = 'ليفت لوج',
    short_description_ar = 'تطبيق لياقة توليت فيه المصادقة والتنقل وتدفق بيانات المستخدم وبناء أساس المشروع.',
    description_ar = 'مشروع Flutter جماعي لتتبع التمارين بصورة منظمة مع تدفقات تطبيق سهلة الصيانة والتطوير.',
    role_ar = 'مسؤول عن تسجيل الدخول وإنشاء الحساب والتنقل وتجهيز نموذج المستخدم وهيكل المشروع الأساسي.',
    challenge_ar = 'احتاج الفريق إلى معمارية أساسية موثوقة تسمح بتوسعة المصادقة والتنقل وبيانات المستخدم دون ربط الشاشات ببعضها بقوة.',
    result_ar = 'هيكل بداية منظم مع تدفقات حسابات تعمل وأساس قابل لإعادة الاستخدام لبقية أعضاء الفريق.',
    technologies_ar = array['Flutter','Dart','Firebase','Cubit']
where slug = 'lift-log';

update public.projects
set title_ar = 'تطبيق الوجبات',
    short_description_ar = 'تطبيق موبايل متصل بـ Firebase ويشمل المصادقة والملفات الشخصية والمفضلة والبيانات السحابية.',
    description_ar = 'مشروع Flutter عملي يوضح المصادقة السحابية وتحويل مستندات Firestore وإدارة المفضلة وحالات الواجهة.',
    role_ar = 'مطور Flutter.',
    challenge_ar = 'كان يجب مزامنة بيانات المستخدم والمفضلة مع Firestore مع إبقاء الواجهة متجاوبة مع حالات التحميل والأخطاء.',
    result_ar = 'تدفق تطبيق يعمل ببيانات سحابية، ويشمل المصادقة وبيانات الملف الشخصي والمفضلة المحفوظة.',
    technologies_ar = array['Flutter','Firebase Authentication','Cloud Firestore']
where slug = 'meals-app';
