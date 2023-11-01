import { render } from '@testing-library/react';

import { NavigationItem } from './Nav/Nav';
import Layout from './Layout';

const navigation: Array<NavigationItem> = [
  { name: 'Home', href: '#banner', current: false },
]

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout title={'mock title'} navigation={navigation} ><p>child component</p></Layout>);
    expect(baseElement).toMatchSnapshot();
  });
});
