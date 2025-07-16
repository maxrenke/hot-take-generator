import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hot Take Generator',
  description: 'A simple app to generate hot takes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
