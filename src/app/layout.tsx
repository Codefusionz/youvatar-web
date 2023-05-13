import { Toaster } from 'react-hot-toast'
import './globals.css'
import SupabaseProvider from './supabase-provider'

export const metadata = {
  title: 'Youvatar',
  description: 'Youvatar is a social media platform for avatars',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
