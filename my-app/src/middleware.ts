import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;
 const isPublicPath = path === '/login' || path === '/signup' || path === '/logout';
const token =  request.cookies.get('token')?.value || '';

if(!token && !isPublicPath) {
    // If the user is not authenticated and trying to access a protected route, redirect to login
    return NextResponse.redirect(
        new URL('/login', request.url)
    );

}

if(token && isPublicPath) {
    // If the user is authenticated and trying to access login or signup, redirect to home
    return NextResponse.redirect(
        new URL('/', request.url)
    );
}
 
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/profile',
    '/'
  ]
}