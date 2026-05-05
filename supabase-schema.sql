-- Supabase schema for Kakaskasen Dua CMS
-- Run this in Supabase Dashboard > SQL Editor.

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  item_id text not null,
  data jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (collection, item_id)
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
using (true);

drop policy if exists "Authenticated admin can insert site content" on public.site_content;
create policy "Authenticated admin can insert site content"
on public.site_content for insert
to authenticated
with check (true);

drop policy if exists "Authenticated admin can update site content" on public.site_content;
create policy "Authenticated admin can update site content"
on public.site_content for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated admin can delete site content" on public.site_content;
create policy "Authenticated admin can delete site content"
on public.site_content for delete
to authenticated
using (true);

-- Create a public bucket named kakaskasen-media in Storage first, then run:
insert into storage.buckets (id, name, public)
values ('kakaskasen-media', 'kakaskasen-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read Kakaskasen media" on storage.objects;
create policy "Public can read Kakaskasen media"
on storage.objects for select
using (bucket_id = 'kakaskasen-media');

drop policy if exists "Authenticated admin can upload Kakaskasen media" on storage.objects;
create policy "Authenticated admin can upload Kakaskasen media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'kakaskasen-media');

drop policy if exists "Authenticated admin can update Kakaskasen media" on storage.objects;
create policy "Authenticated admin can update Kakaskasen media"
on storage.objects for update
to authenticated
using (bucket_id = 'kakaskasen-media')
with check (bucket_id = 'kakaskasen-media');

drop policy if exists "Authenticated admin can delete Kakaskasen media" on storage.objects;
create policy "Authenticated admin can delete Kakaskasen media"
on storage.objects for delete
to authenticated
using (bucket_id = 'kakaskasen-media');
