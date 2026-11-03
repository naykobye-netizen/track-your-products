import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Redirects to the login or registration section, depending on whether or not you have your account access token
export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Pages that will be affected by the redirection
export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
    ],
};