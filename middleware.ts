// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get('auth-store')?.value;

//   if (!accessToken) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'],
// };
