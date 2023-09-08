import { authMiddleware } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages } from './app/i18n/settings';

acceptLanguage.languages(languages);

const cookieName = 'i18next';

function i18n(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/sign-in') ||
    req.nextUrl.pathname.startsWith('/sign-up') ||
    req.nextUrl.pathname.startsWith('/onboarding') ||
    req.nextUrl.pathname.startsWith('/host')
  ) {
    return NextResponse.next()
  }

  let lng : string | null = '';
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(<string>req.headers.get('referer'));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }
    return response;
  }

  return NextResponse.next();
}

export default authMiddleware({
  beforeAuth: (req) => {
    return i18n(req);
  },
  publicRoutes: [
    '/',
    '/en',
    '/zh',
    '/host',
    '/zh/campaigns(.*)',
    '/en/campaigns(.*)',
    '/zh/user(.*)',
    '/en/user(.*)',
  ],
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|icons|logo|sponsors|challenge/og|challenge/assets|favicon.ico|sw.js).*)',
  ],
};
