'use client'

import { useEffect, useState } from 'react'
import { Activity, ArrowUpRight, BadgeAlert, Car, ChevronRight, Crosshair, Eye, LockKeyhole, Radio, Shield, Siren, Skull, UserPlus, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const roles = [
  { name: 'Police', icon: Shield, tone: 'Служба порядка', description: 'Patrol the streets, investigate incidents, and keep the city under control.', action: 'Join the force' },
  { name: 'EMS', icon: Crosshair, tone: 'Медицинская служба', description: 'Respond to emergencies, save lives, and become the city’s first line of help.', action: 'Start a shift' },
  { name: 'Civilian', icon: Car, tone: 'Городская жизнь', description: 'Build a career, buy a home, and write your own story in Verosliz.', action: 'Enter the city' },
  { name: 'Criminal', icon: Skull, tone: 'Теневая сторона', description: 'Take risks, build your crew, and make your name beyond the law.', action: 'Go underground' },
]
const news = [['CITY UPDATE', 'The northern district is open. New jobs, apartments, and routes are live.', '12 min ago'], ['COMMUNITY', 'Weekend convoy is gathering at Vostok Station. Bring your crew.', '48 min ago'], ['SERVER', 'Economy rebalance and vehicle handling improvements deployed.', '2 hrs ago']]

type AuthMode = 'login' | 'signup'

export default function Home() {
  const [activeRole, setActiveRole] = useState(0)
  const [launching, setLaunching] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const role = roles[activeRole]

  useEffect(() => {
    const authError = new URLSearchParams(window.location.search).get('auth_error')
    if (authError) {
      setAuthMode('login')
      setMessage(authError)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])
  const Icon = role.icon

  async function submitAuth(event: React.FormEvent) {
    event.preventDefault()
    if (submitting) return
    setMessage('')
    setSubmitting(true)
    try {
      const supabase = createClient()
      const result = authMode === 'signup'
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback` } })
        : await supabase.auth.signInWithPassword({ email, password })
      if (result.error) {
        const detail = result.error.message.toLowerCase()
        setMessage(detail.includes('confirm') ? 'Check your email to confirm your account.' : detail.includes('rate') ? 'Too many attempts. Please try again later.' : 'Unable to continue. Check your details and try again.')
      } else {
        setMessage(authMode === 'signup' ? 'Account created. Check your email to confirm access.' : 'Signed in. Welcome to Verosliz.')
      }
    } catch {
      setMessage('The access service is unavailable. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="grain min-h-screen overflow-hidden"><div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 py-5 sm:px-8 lg:px-12">
    <header className="rise flex items-center justify-between border-b border-border/70 pb-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center border border-primary/60 bg-primary text-primary-foreground"><Siren size={21} /></div><div><p className="font-mono text-[10px] tracking-[.28em] text-primary">VEROSLIZ</p><p className="text-sm font-semibold tracking-[.12em] text-foreground">RUSSIA / CRMP</p></div></div><nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[.18em] text-muted-foreground md:flex"><a className="text-primary" href="#play">Play</a><a href="#city">The city</a><a href="#news">News</a></nav><button onClick={() => setAuthMode('login')} className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"><LockKeyhole size={14} />Sign in <ChevronRight size={14} /></button></header>

    <section id="play" className="rise delay-1 grid gap-5 py-7 lg:grid-cols-[1.4fr_.8fr] lg:py-10"><div className="panel relative overflow-hidden border border-border p-6 sm:p-9"><div className="relative max-w-xl"><div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.22em] text-accent"><Activity size={15} /> Server online <span className="text-muted-foreground">/</span> EU-1 Verosliz</div><h1 className="max-w-2xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.05em] text-foreground sm:text-6xl">Your story.<br /><span className="text-primary">Your rules.</span></h1><p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">A living Russian city where every decision matters. Choose your path, find your people, and make Verosliz yours.</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setLaunching(true)} className="group flex items-center gap-3 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85">{launching ? 'Development mode' : 'Play now'} <ArrowUpRight size={17} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button><button onClick={() => setAuthMode('signup')} className="flex items-center gap-2 border border-border px-5 py-3 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground"><UserPlus size={16} /> Create account</button></div></div></div>
      <div className="flex flex-col gap-5"><div className="panel flex-1 border border-border p-6"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Development progress</p><p className="mt-3 text-4xl font-semibold tracking-[-.05em]">20<span className="text-lg text-muted-foreground">%</span></p></div><div className="flex size-10 items-center justify-center border border-primary/50 text-primary"><Activity size={19} /></div></div><div className="mt-6 h-2 bg-muted"><div className="h-2 w-1/5 bg-primary transition-all duration-700" /></div><div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><span>{launching ? 'Build loaded' : 'Early access build'}</span><span className="text-primary">20 / 100</span></div></div><div className="panel border border-border p-6"><div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Server status</p><Radio size={16} className="text-accent" /></div><p className="mt-3 text-lg font-medium">EU-1 Verosliz</p><div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-accent" /> Online · 42 ms latency</div></div></div></section>

    <section id="city" className="rise delay-2 pb-7"><div className="mb-4 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Find your calling</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Choose your way in</h2></div><p className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">Four lives. One city.</p></div><div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{roles.map((item, index) => { const ItemIcon = item.icon; return <button key={item.name} onClick={() => setActiveRole(index)} className={`group text-left transition ${activeRole === index ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary/60'}`}><div className="flex flex-col gap-8 border p-4 sm:p-5"><div className="flex items-center justify-between"><ItemIcon size={20} /><span className={`font-mono text-[10px] ${activeRole === index ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>0{index + 1}</span></div><div><p className="text-lg font-semibold">{item.name}</p><p className={`mt-1 font-mono text-[9px] uppercase tracking-wider ${activeRole === index ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{item.tone}</p></div></div></button>})}</div></section>
    <section id="news" className="grid gap-5 border-t border-border/70 py-7 lg:grid-cols-[1fr_1.3fr]"><div className="panel border border-border p-6"><div className="flex items-center gap-3"><Icon size={22} className="text-primary" /><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Selected path</p><h3 className="mt-1 text-2xl font-semibold">{role.name}</h3></div></div><p className="mt-5 text-sm leading-6 text-muted-foreground">{role.description}</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="font-mono text-[10px] uppercase tracking-widest text-accent">Development role</span><button className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline">{role.action}<ArrowUpRight size={14} /></button></div></div><div><div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold">City bulletin</h3><button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">View all <ArrowUpRight className="ml-1 inline" size={12} /></button></div><div className="flex flex-col">{news.map(([tag, title, time]) => <article key={title} className="flex gap-4 border-b border-border py-4 first:border-t"><BadgeAlert size={17} className="mt-0.5 shrink-0 text-primary" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><span className="font-mono text-[9px] tracking-[.18em] text-accent">{tag}</span><span className="font-mono text-[9px] text-muted-foreground">{time}</span></div><p className="mt-1 text-sm text-foreground/90">{title}</p></div></article>)}</div></div></section>
    <footer className="mt-auto flex flex-col gap-2 border-t border-border/70 py-5 font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Verosliz Interactive</span><span className="flex items-center gap-2"><Eye size={12} className="text-primary" /> Built for roleplayers</span></footer>
  </div>
  {authMode && <div className="fixed inset-0 z-10 flex items-center justify-center bg-background/85 p-5 backdrop-blur-sm"><div className="panel w-full max-w-md border border-primary/40 p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">Verosliz access</p><h2 className="mt-2 text-2xl font-semibold">{authMode === 'login' ? 'Sign in to play' : 'Create your account'}</h2></div><button aria-label="Close" onClick={() => setAuthMode(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button></div><form onSubmit={submitAuth} className="mt-6 flex flex-col gap-4"><label className="flex flex-col gap-2 text-xs text-muted-foreground">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-primary" /></label><label className="flex flex-col gap-2 text-xs text-muted-foreground">Password<input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} className="border border-border bg-background px-3 py-3 text-foreground outline-none focus:border-primary" /></label><button disabled={submitting} className="mt-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Connecting…' : authMode === 'login' ? 'Sign in' : 'Create account'}</button></form>{message && <p className="mt-4 text-sm text-accent">{message}</p>}<button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setMessage('') }} className="mt-5 text-xs text-muted-foreground hover:text-primary">{authMode === 'login' ? 'Account creation not available?' : 'Already have an account? Sign in'}</button></div></div>}
  </main>
}
