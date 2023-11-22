import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '@css/globals.css';
import RootLayout from './Layout';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <Component {...pageProps} className="pink" />
      </RootLayout>
    </SessionProvider>
  );
}

export default CustomApp;
