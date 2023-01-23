import { NextResponse } from 'next/server';

export function middleware(req: any) {
  // Redirect if url is not home page and environment is production
  if (
    req.nextUrl.pathname !== '/' &&
    // ignore resources files
    !/.*.[css|svg|png|jpg|jpeg|ico]$/.test(req.nextUrl.pathname) &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
