import { ReactNode } from 'react';

import Nav, { NavigationItem } from './Nav/Nav';
import Footer from './Footer/Footer';

export interface LayoutProps {
  children: ReactNode;
  navigation: Array<NavigationItem>;
}

export function Layout({ children, navigation }: LayoutProps) {
  return (
    <>
      <Nav navigation={navigation} />
      <main>{children}</main>

      <Footer />
    </>
  );
}

export default Layout;
