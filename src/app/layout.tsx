import ReduxProvider from '@/app/providers/redux-provider'
import SupabaseProvider from '@/app/providers/supabase-provider'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata = {
  title: 'Youvatar',
  description:
    'Youvatar is a social media platform that allows users to create their own avatars and share them with the world.',
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
        <ReduxProvider>
          <SupabaseProvider>{children}</SupabaseProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
