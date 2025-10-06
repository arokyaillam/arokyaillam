# Database Setup

This directory contains the database migrations for the AROKYA ILLAM CHARITABLE TRUST website.

## Running Migrations

1. **Via Supabase Dashboard:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of each migration file in order:
     1. `migrations/001_initial_schema.sql`
     2. `migrations/002_rls_policies.sql`
     3. `migrations/003_storage_setup.sql`

2. **Via Supabase CLI (if installed):**
   ```bash
   supabase db reset
   ```

## Migration Files

- **001_initial_schema.sql**: Creates all tables (programs, posts, events, forms) with proper indexes and triggers
- **002_rls_policies.sql**: Sets up Row Level Security policies for data access control
- **003_storage_setup.sql**: Creates storage bucket and policies for file uploads

## Environment Variables Required

Make sure to set up your `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Manual Admin Setup

After running migrations and setting up authentication:

1. Create admin users in Supabase Auth
2. Go to Authentication > Users in your Supabase dashboard
3. Edit the desired user and add `role: admin` to their metadata
4. Or run this SQL to manually set a user's role:
   ```sql
   update auth.users set raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}' where email = 'admin@example.com';