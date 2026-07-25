-- Run this once in Supabase SQL Editor after migration-v2.sql.
-- Adds Arabic project content used by the EN / AR language switcher.

alter table public.projects add column if not exists title_ar text;
alter table public.projects add column if not exists short_description_ar text;
alter table public.projects add column if not exists description_ar text;
alter table public.projects add column if not exists role_ar text;
alter table public.projects add column if not exists challenge_ar text;
alter table public.projects add column if not exists result_ar text;
alter table public.projects add column if not exists technologies_ar text[] not null default '{}';

update public.projects
set
  title_ar = coalesce(title_ar, 'ويد ويش'),
  short_description_ar = coalesce(short_description_ar, 'منصة Flutter وويب تساعد المقبلين على الزواج في تنظيم الهدايا ومشاركة ملف شخصي مخصص.'),
  description_ar = coalesce(description_ar, 'منصة تخرج تجمع بين تطبيق Flutter وموقع ويب متجاوب، مع المصادقة والتخزين وربط الـ API والملفات الشخصية القابلة للمشاركة.'),
  role_ar = coalesce(role_ar, 'مطور Flutter مسؤول عن المصادقة وربط الـ backend والتخزين وتدفقات المستخدم وواجهة الموبايل.'),
  challenge_ar = coalesce(challenge_ar, 'كان المطلوب ربط مستخدمي الموبايل والويب من خلال ملف شخصي وتدفق هدايا واضح، مع الحفاظ على اتساق المصادقة والبيانات.'),
  result_ar = coalesce(result_ar, 'تجربة مترابطة بين الموبايل والويب تشمل ملفات قابلة للمشاركة ومصادقة آمنة ومحتوى يعتمد على الـ backend.'),
  technologies_ar = case when cardinality(technologies_ar) = 0 then array['Flutter','Dart','Strapi','Supabase','JWT','REST API'] else technologies_ar end
where slug = 'weddwish';

update public.projects
set
  title_ar = coalesce(title_ar, 'ليفت لوج'),
  short_description_ar = coalesce(short_description_ar, 'تطبيق لياقة توليت فيه المصادقة والتنقل وتدفق بيانات المستخدم وبناء أساس المشروع.'),
  description_ar = coalesce(description_ar, 'مشروع Flutter جماعي لتتبع التمارين بصورة منظمة مع تدفقات تطبيق سهلة الصيانة والتطوير.'),
  role_ar = coalesce(role_ar, 'مسؤول عن تسجيل الدخول وإنشاء الحساب والتنقل وتجهيز نموذج المستخدم وهيكل المشروع الأساسي.'),
  challenge_ar = coalesce(challenge_ar, 'احتاج الفريق إلى معمارية أساسية موثوقة تسمح بتوسعة المصادقة والتنقل وبيانات المستخدم دون ربط الشاشات ببعضها بقوة.'),
  result_ar = coalesce(result_ar, 'هيكل بداية منظم مع تدفقات حسابات تعمل وأساس قابل لإعادة الاستخدام لبقية أعضاء الفريق.'),
  technologies_ar = case when cardinality(technologies_ar) = 0 then array['Flutter','Dart','Firebase','Cubit'] else technologies_ar end
where slug = 'lift-log';

update public.projects
set
  title_ar = coalesce(title_ar, 'تطبيق الوجبات'),
  short_description_ar = coalesce(short_description_ar, 'تطبيق موبايل متصل بـ Firebase ويشمل المصادقة والملفات الشخصية والمفضلة والبيانات السحابية.'),
  description_ar = coalesce(description_ar, 'مشروع Flutter عملي يوضح المصادقة السحابية وتحويل مستندات Firestore وإدارة المفضلة وحالات الواجهة.'),
  role_ar = coalesce(role_ar, 'مطور Flutter.'),
  challenge_ar = coalesce(challenge_ar, 'كان يجب مزامنة بيانات المستخدم والمفضلة مع Firestore مع إبقاء الواجهة متجاوبة مع حالات التحميل والأخطاء.'),
  result_ar = coalesce(result_ar, 'تدفق تطبيق يعمل ببيانات سحابية، ويشمل المصادقة وبيانات الملف الشخصي والمفضلة المحفوظة.'),
  technologies_ar = case when cardinality(technologies_ar) = 0 then array['Flutter','Firebase Authentication','Cloud Firestore'] else technologies_ar end
where slug = 'meals-app';
