import { NextRequest, NextResponse } from 'next/server';
import { NeedAuth, NoAuth, Pages } from '@/enum/pages.enum';

const AUTH_COOKIE_NAME = 'access_token';

const needAuthRoutes = Object.values(NeedAuth);
const noAuthRoutes = Object.values(NoAuth);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  if (needAuthRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = Pages.LOGIN;
      return NextResponse.redirect(loginUrl);
    }
  }

  if (noAuthRoutes.some((route) => pathname === route)) {
    if (isAuthenticated) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = Pages.HOME_AUTH;
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}
