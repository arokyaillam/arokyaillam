-- Create storage bucket for uploads
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', false);

-- Storage policies
create policy "anon_upload" on storage.objects for insert to anon with check (
    bucket_id = 'uploads'
);

create policy "owner_read" on storage.objects for select using (
    auth.role() in ('authenticated','service_role')
);

-- Note: Additional policies for authenticated users can be added here if needed
-- create policy "authenticated_upload" on storage.objects for insert to authenticated with check (
--     bucket_id = 'uploads'
-- );