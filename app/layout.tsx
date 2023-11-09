import './globals.css'
import { Josefin_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { ReduxProvider } from '@/Providers/ReduxProvider'
import { ToastProvider } from '@/Providers/ToastProvider'
import { Inter } from 'next/font/google'

// const font = localFont({ src: '../public/assets/fonts/Octarine-Light.ttf' })

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Izesan!',
  description: 'Learn African Languages',
  keywords: [],
}

interface LayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body id="modal-root" className={inter.className}>
        <ToastProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
