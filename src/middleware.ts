import { NextResponse } from 'next/server';
import { authMiddleware } from '@clerk/nextjs';
import { fallbackLng, languages } from './app/i18n/settings';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(languages);

const cookieName = 'i18next';

function i18n(req: any) {
  let lng = null;
  if (req.cookies.has(cookieName)) {
    // 临时方案，todo 多语言支持
    // lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = fallbackLng;
  }

  // Redirect if lng in path is not supported
  if (
    !req.nextUrl.pathname.startsWith('/sign-in') &&
    !req.nextUrl.pathname.startsWith('/sign-up')
  ) {
    if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`))) {
      return NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
      );
    }
  }

  if (req.nextUrl.pathname.startsWith('/en/challenges')) {
    return NextResponse.redirect(
      new URL(`/en/campaigns${req.nextUrl.pathname.substring(14)}`, req.url),
    );
  } else if (req.nextUrl.pathname.startsWith('/zh/challenges')) {
    return NextResponse.redirect(
      new URL(`/zh/campaigns${req.nextUrl.pathname.substring(14)}`, req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
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
    '/:locale',
    '/:locale/sign-in(.*)',
    '/:locale/sign-up(.*)',
    '/:locale/challenges(.*)',
    '/:locale/campaigns(.*)',
    '/:locale/user(.*)',
  ],
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|icons|logo|sponsors|challenge/og|challenge/assets|favicon.ico|sw.js).*)',
  ],
};
