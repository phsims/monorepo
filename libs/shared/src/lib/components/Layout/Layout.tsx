import { ReactNode } from "react";
import Head from "next/head";

import Nav, { NavigationItem } from "./Nav/Nav";
import Footer from "./Footer/Footer";

export interface LayoutProps {
  title: string;
  children: ReactNode;
  navigation: Array<NavigationItem>;
}

export function Layout({ title, children, navigation }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Nav navigation={navigation} />
      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default Layout;
