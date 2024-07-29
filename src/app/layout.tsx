import Navbar from '@/components/NavBar'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import '@/styles/globals.css'
import Footer from '@/components/Footer'
import AuthProvider from '@/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'QuickTask',
  description: 'Todo App built with Next.js and Laravel'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className='bg-black text-neutral-100 h-dvh'>
          <main className='container max-w-[1100px] mx-auto'>
            <Navbar />

            <section className='min-h-[calc(100vh-9rem)]'>{children}</section>
          </main>

          <Footer />

          <Toaster theme='dark' duration={2500} />
        </body>
      </html>
    </AuthProvider>
  )
}
