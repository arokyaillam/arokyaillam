import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js'],
  },

  // Disable static optimization for admin pages
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },

  // Output configuration
  output: 'standalone',

  // Disable static generation for admin routes
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ]
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Remove the automatic redirect from /admin to /admin/login
      // Users can access /admin directly and will be redirected by ProtectedRoute if not authenticated
    ];
  },
};

export default nextConfig;
