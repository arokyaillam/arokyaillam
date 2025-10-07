import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Create response to add security headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Add CSRF protection for non-GET requests
  if (request.method !== 'GET') {
    const origin = request.headers.get('Origin') || '';
    const host = request.headers.get('Host') || '';

    if (!origin.includes(host) && origin !== '') {
      return new NextResponse(null, { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};