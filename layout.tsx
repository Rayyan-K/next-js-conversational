import { IBM_Plex_Sans_Arabic } from 'next/font/google'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.className}>
      <body>{children}</body>
    </html>
  )
}

