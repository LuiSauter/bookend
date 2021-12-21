import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

/** @param {import("next/server").NextRequest} req */
export async function middleware(req: any) {
  if (req.nextUrl.pathname === '/middleware-protected') {
    const session = await getToken({
      req,
      secret: process.env.SECRET || '',
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith('https://') ??
        !!process.env.VERCEL_URL,
    })
    if (!session) return NextResponse.redirect('/api/auth/signin')
  }
}