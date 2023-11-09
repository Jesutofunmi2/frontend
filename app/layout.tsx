import './globals.css'
import localFont from 'next/font/local'
import { ToastProvider } from '@/providers/ToastProvider'
import { ReduxProvider } from '@/providers/ReduxProvider'

const font = localFont({
  src: [
    {
      path: '../public/assets/fonts/Octarine-Light.otf',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../public/assets/fonts/Octarine-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
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
      <body id="modal-root" className={font.className}>
        <ToastProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
