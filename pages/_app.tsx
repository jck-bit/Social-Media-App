import '@/styles/globals.css'
import '@/styles/main.css'
import '@/styles/share.css'
import '@/styles/rightbar.css'
import '@/styles/loader.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
