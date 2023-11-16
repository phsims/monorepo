import { Nav, NavigationItem, Footer } from '@shared';

const navigation: Array<NavigationItem> = [
  { name: 'Home', href: '#banner', current: false },
  { name: 'Features', href: '#features', current: false },
  // { name: 'Recipe', href: '#cook-section', current: false },
  // { name: 'Gallery', href: '#gallery-section', current: false },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pink">
        <Nav navigation={navigation} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
