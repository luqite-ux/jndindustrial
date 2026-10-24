import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { protectPreviewResponse } from '@/lib/site-content/preview-protection'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-status'

const PREVIEW_COOKIE = '__Host-hq-site-preview'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
  if (!isPublic && pathname.startsWith('/admin') && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('reason', 'unauthorized')
    const response = NextResponse.redirect(url)
    protectPreviewResponse(response.headers, request.cookies.has(PREVIEW_COOKIE))
    return response
  }
  if (!isServiceGuardExcludedPath(pathname) && !(await isWebsiteServiceAvailable(request))) {
    const response = NextResponse.rewrite(new URL('/service-expired', request.url))
    protectPreviewResponse(response.headers, request.cookies.has(PREVIEW_COOKIE))
    return response
  }
  const response = NextResponse.next()
  protectPreviewResponse(response.headers, request.cookies.has(PREVIEW_COOKIE))
  return response
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.jpg|apple-icon.jpg).*)'] }
