-- Run this once in Supabase SQL Editor for an existing portfolio database.
-- It adds screenshot galleries and an embeddable app/emulator URL to every project.

alter table public.projects
  add column if not exists gallery_urls text[] not null default '{}';

alter table public.projects
  add column if not exists embed_url text;

-- Optional: richer starter project text for existing records.
update public.projects
set
  challenge = coalesce(challenge, 'The product needed a clear, maintainable flow that connects the user interface with authentication and backend data.'),
  result = coalesce(result, 'The project produced a working application flow and a stronger reusable foundation for future features.')
where slug in ('weddwish', 'lift-log', 'meals-app');
