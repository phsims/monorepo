import { AppProps } from 'next/app';

import 'css/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default CustomApp;
