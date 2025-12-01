import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Verzekering Calculator - Maak uw totaalpakket',
  description: 'Vergelijk en sluit eenvoudig uw verzekeringspakket af',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}

