import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './styles.css';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} className="pink" />
    </SessionProvider>
  );
}

export default CustomApp;
