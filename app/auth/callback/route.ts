import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')
  const destination = new URL('/', url.origin)

  if (error || errorDescription) {
    destination.searchParams.set('auth_error', 'Unable to confirm your account. Please request a new link.')
  } else if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) destination.searchParams.set('auth_error', 'Unable to confirm your account. Please request a new link.')
  }

  return NextResponse.redirect(destination)
}
