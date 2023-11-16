import { Layout, NavigationItem } from '@shared';
import { ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
}

const navigation: Array<NavigationItem> = [
  { name: 'Home', href: '#banner', current: false },
  { name: 'Features', href: '#features', current: false },
];

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <Layout navigation={navigation}>
      <main>{children}</main>
    </Layout>
  );
}

export default RootLayout;
