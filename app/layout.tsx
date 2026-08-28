import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRMP — Criminal Russia Multiplayer',
  description: 'A living roleplay world where every choice has a consequence.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>
}
