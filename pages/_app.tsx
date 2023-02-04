import '@/styles/globals.css'
import '@/styles/main.css'
import '@/styles/share.css'
import '@/styles/rightbar.css'
import '@/styles/loader.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'


function MyApp({Component, pageProps}: AppProps<{session: Session}>) {
    return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer/>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </SessionProvider>
  );
}

export default MyApp;
