#!/bin/bash

echo "🚀 AROKYA ILLAM CHARITABLE TRUST - Setup Script"
echo "=============================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  Please edit .env.local and add your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
    echo ""
else
    echo "✅ .env.local already exists"
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Database Setup:"
echo "   1. Go to your Supabase project dashboard"
echo "   2. Navigate to SQL Editor"
echo "   3. Run the migration files in order:"
echo "      - supabase/migrations/001_initial_schema.sql"
echo "      - supabase/migrations/002_rls_policies.sql"
echo "      - supabase/migrations/003_storage_setup.sql"
echo ""
echo "🔐 Admin Setup:"
echo "   1. Create admin users in Supabase Auth"
echo "   2. Add 'role: admin' to user metadata"
echo ""
echo "🚀 Start Development:"
echo "   npm run dev"
echo ""
echo "✅ Setup complete!"