-- Enable Row Level Security on all tables
alter table programs enable row level security;
alter table posts enable row level security;
alter table events enable row level security;
alter table forms_contacts enable row level security;
alter table forms_support_applications enable row level security;
alter table forms_volunteers enable row level security;

-- Public read policies for published content
create policy "public_read_programs" on programs for select using (true);

create policy "public_read_posts" on posts for select using (
    published_at is not null and published_at <= now()
);

create policy "public_read_events" on events for select using (true);

-- Anyone can submit forms (insert policies)
create policy "insert_contacts" on forms_contacts for insert with check (true);

create policy "insert_support_applications" on forms_support_applications for insert with check (true);

create policy "insert_volunteers" on forms_volunteers for insert with check (true);

-- Admin/staff full access policies
create policy "admin_all_programs" on programs for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);

create policy "admin_all_posts" on posts for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);

create policy "admin_all_events" on events for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);

create policy "admin_all_forms" on forms_contacts for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);

create policy "admin_all_support" on forms_support_applications for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);

create policy "admin_all_volunteers" on forms_volunteers for all using (
    auth.jwt() ->> 'role' in ('admin','staff')
);