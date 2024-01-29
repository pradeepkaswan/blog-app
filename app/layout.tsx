import { Inter as FontSans } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/nav'
import Provider from '@/components/providers/session-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Provider>
          <Nav />
          <div className="m-12">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
