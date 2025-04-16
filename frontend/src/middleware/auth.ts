import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;
    const isAuthPage = req.nextUrl.pathname === '/login';
    const isProtectedRoute = req.nextUrl.pathname.startsWith('/modules');

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/modules/home', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/modules/:path*',
        '/login',
    ],
};