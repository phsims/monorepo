import Head from 'next/head';
import styles from './Layout.module.scss';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';


export interface LayoutProps {
  children: React.ReactNode,
  title: string
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles['container']}>
        <Nav />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
