import { AppProps } from 'next/app';

import './globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default CustomApp;
