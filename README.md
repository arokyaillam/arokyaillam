# AROKYA ILLAM CHARITABLE TRUST - Official Website

A production-ready, secure, accessible, and fast website for AROKYA ILLAM CHARITABLE TRUST built with Next.js, TypeScript, and modern web technologies.

## 🌟 Features

### Core Features
- **Public Marketing Site**: Programs, impact, FAQs, news/events, and donation information
- **Beneficiary Intake**: Get Support form with file uploads and email acknowledgements
- **Volunteer Management**: Volunteer sign-up and management system
- **Contact System**: Contact forms with spam protection
- **Admin Portal**: Protected admin dashboard for content and submission management
- **Multilingual Support**: English and Tamil language support with locale switching

### Technical Excellence
- **Performance Optimized**: Image optimization, caching, Core Web Vitals monitoring
- **Accessibility First**: WCAG 2.2 AA compliant with comprehensive accessibility features
- **SEO Optimized**: Dynamic metadata, sitemap, robots.txt, and Open Graph images
- **Security Hardened**: Content Security Policy, rate limiting, CSRF protection
- **Mobile Responsive**: Optimized for all device sizes and screen readers

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router and Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (server) + Zustand (client)
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl (English + Tamil)

### Backend & Database
- **Backend**: Next.js Route Handlers + Supabase
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth with role-based access (admin/staff/viewer)
- **File Storage**: Supabase Storage with private buckets
- **Real-time**: Supabase real-time subscriptions

### DevOps & Quality
- **Deployment**: Vercel with preview deployments
- **Testing**: Playwright (e2e) + Vitest (unit) + Testing Library
- **Code Quality**: ESLint + Prettier + TypeScript strict mode
- **Performance**: Bundle optimization + image optimization + caching strategies
- **Analytics**: Vercel Analytics (fallback: Plausible)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project
- Vercel account (for deployment)

## 🛠️ Installation & Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd arokyaillam
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Optional: Email Service
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Database Setup**
   ```bash
   # Run the migrations in your Supabase dashboard SQL editor
   # Copy and paste the contents of:
   # - supabase/migrations/001_initial_schema.sql
   # - supabase/migrations/002_rls_policies.sql
   # - supabase/migrations/003_storage_setup.sql
   ```

4. **Admin User Setup**
   - Create admin users in Supabase Auth dashboard
   - Add `role: admin` to user metadata for admin access
   - Or run SQL: `UPDATE auth.users SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}' WHERE email = 'admin@example.com';`

## 🚀 Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run unit tests
npm run test

# Run e2e tests
npm run e2e

# Type checking
npm run typecheck
```

## 🏗️ Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes (OG images, etc.)
│   │   └── [locale]/       # Localized pages
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utilities and configurations
│   │   ├── auth/          # Authentication logic
│   │   ├── supabase/      # Supabase client and utilities
│   │   ├── validations/   # Form validation schemas
│   │   └── performance.ts # Performance utilities
│   └── test/              # Test setup and utilities
├── supabase/              # Database migrations and setup
├── e2e/                   # End-to-end tests
├── messages/              # Internationalization files
└── public/                # Static assets
```

## 🔒 Security Features

- **Content Security Policy**: Strict CSP headers configured
- **Rate Limiting**: Per-IP rate limiting on form endpoints
- **CSRF Protection**: POST requests with origin verification
- **Row Level Security**: Database-level access control via RLS policies
- **File Upload Security**: Private storage buckets with authenticated access
- **Input Validation**: Comprehensive Zod schemas for all inputs

## ♿ Accessibility Features

- **WCAG 2.2 AA Compliant**: Comprehensive accessibility implementation
- **Keyboard Navigation**: Full keyboard accessibility with skip links
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and focus trapping
- **Color Contrast**: High contrast ratios meeting accessibility standards
- **Reduced Motion**: Respects user's motion preferences

## 🌐 Internationalization

- **English & Tamil**: Complete translations for both languages
- **Locale Switching**: Seamless language switching with URL routing
- **RTL Support**: Ready for right-to-left languages if needed
- **SEO Optimized**: Proper hreflang and language meta tags

## 📊 Performance Optimizations

- **Image Optimization**: WebP/AVIF support with proper sizing
- **Bundle Optimization**: Package import optimization and code splitting
- **Caching Strategies**: Intelligent caching with cache invalidation
- **Core Web Vitals**: Real-time monitoring and optimization
- **CDN Ready**: Optimized for global content delivery

## 🧪 Testing

### Unit Tests (Vitest)
```bash
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run with coverage report
```

### End-to-End Tests (Playwright)
```bash
npm run e2e           # Run e2e tests
npm run e2e:ui        # Run with Playwright UI
npm run e2e:headed    # Run in headed mode
```

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Set up Supabase database (already configured)
4. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run e2e` - Run e2e tests
- `npm run typecheck` - TypeScript type checking

## 🔧 Configuration

### Environment Variables
See `.env.example` for all required and optional environment variables.

### Database Schema
Complete database schema with tables for:
- Programs and content management
- User forms (support applications, volunteers, contacts)
- Events and news management
- Authentication and authorization

### Admin Roles
- **Admin**: Full access to all features and settings
- **Staff**: Access to content management and form reviews
- **Viewer**: Read-only access to dashboard and reports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is built for AROKYA ILLAM CHARITABLE TRUST. All rights reserved.

## 🆘 Support

For technical support or questions:
- Email: support@arokyaillam.org
- Documentation: See `/admin` dashboard for user guides
- Issues: Create an issue in the repository

---

**Built with ❤️ for AROKYA ILLAM CHARITABLE TRUST**

*Think better. Healthcare and support for persons with disability across India.*
