import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/entries')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '');
    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');
    if (!checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = '/api/bad-request';
      url.search = `?message=The ID ${id} is not a valid MongoDB ObjectID`;

      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/api/:path*',
    '/api/entries/:path',
  ],
};
