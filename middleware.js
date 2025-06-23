import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('hello world middleware')
  const pathname = request.nextUrl.pathname;

  // Skip for already prefixed locales or special paths
  if (pathname.startsWith('/en') || pathname.startsWith('/de') || pathname.startsWith('/_next')) {
    return;
  }

  // Detect browser language
  const acceptLanguage = request.headers.get('accept-language');
  const preferredLocale = acceptLanguage?.startsWith('de') ? 'de' : 'en';

  // Redirect to preferred locale
  return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
}

// Match only root path or unmatched routes
export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
