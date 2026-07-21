import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const STAFF_ROLES = ['True Owner', 'Owner', 'Mod', 'Staff'];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = (req.nextauth.token as any)?.role;

    // Staff-only dashboard routes get an extra role check on top of
    // "is logged in" — anyone else is bounced to /403, not just /login.
    if (pathname.startsWith('/moon') && !STAFF_ROLES.includes(role)) {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: '/login' },
    callbacks: {
      // Returning true means "authorized, proceed" — actual staff-role
      // gating happens above, this only gates "must be logged in at all".
      authorized: ({ token }) => !!token,
    },
  }
);

// Every route is protected EXCEPT /login and Next.js internals/static
// assets — guests should only ever be able to reach the login page.
export const config = {
  matcher: [
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico|og-image.png|robots.txt|sitemap.xml).*)',
  ],
};
