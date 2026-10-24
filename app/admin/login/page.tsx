import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'JND website administration', robots: { index: false, follow: false } }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <main className="min-h-screen bg-steel px-5 py-20">
    <section className="mx-auto max-w-md border border-border bg-white p-8 shadow-sm">
      <p className="eyebrow text-navy-soft">JND Industrial</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-navy">Website administration</h1>
      <form action="/api/auth/login" method="post" className="mt-8 space-y-5">
        {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">Sign-in failed. Check your email and password.</p>}
        <label className="block text-sm font-semibold text-navy">Email<input name="email" type="email" autoComplete="username" required className="mt-2 block w-full border border-border bg-white p-3 font-normal text-foreground" /></label>
        <label className="block text-sm font-semibold text-navy">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full border border-border bg-white p-3 font-normal text-foreground" /></label>
        <button className="h-12 w-full bg-cta px-6 font-semibold text-cta-foreground" type="submit">Sign in</button>
      </form>
    </section>
  </main>
}
