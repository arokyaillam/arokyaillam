-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create tables
create table programs (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    summary text not null,
    body text not null,
    locale text not null default 'en',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table posts (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    excerpt text,
    body text not null,
    published_at timestamptz,
    locale text not null default 'en',
    created_by uuid references auth.users(id),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table events (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text not null,
    start_at timestamptz not null,
    end_at timestamptz,
    venue text,
    city text,
    state text,
    registration_url text,
    created_at timestamptz default now()
);

create table forms_contacts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    phone text,
    message text not null,
    created_at timestamptz default now()
);

create table forms_support_applications (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    guardian_name text,
    email text,
    phone text,
    address text,
    city text,
    state text,
    pincode text,
    disability_type text,
    support_needed text,
    income_proof_url text,
    medical_proof_url text,
    additional_notes text,
    status text not null default 'submitted',
    created_at timestamptz default now(),
    created_by uuid references auth.users(id)
);

create table forms_volunteers (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    phone text,
    skills text,
    availability text,
    notes text,
    created_at timestamptz default now()
);

-- Create indexes for better performance
create index idx_programs_locale on programs(locale);
create index idx_posts_locale_published on posts(locale, published_at);
create index idx_posts_slug on posts(slug);
create index idx_events_start_at on events(start_at);
create index idx_forms_contacts_created_at on forms_contacts(created_at);
create index idx_forms_support_applications_status on forms_support_applications(status);
create index idx_forms_support_applications_created_at on forms_support_applications(created_at);
create index idx_forms_volunteers_created_at on forms_volunteers(created_at);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_programs_updated_at before update on programs for each row execute function update_updated_at_column();
create trigger update_posts_updated_at before update on posts for each row execute function update_updated_at_column();