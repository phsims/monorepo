import { render } from '@testing-library/react';

import Nav, { NavigationItem } from './Nav';

const navigation: Array<NavigationItem> = [
  { name: 'Home', href: '#banner', current: false },
];

describe('Nav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Nav navigation={navigation} />);
    expect(baseElement).toMatchSnapshot();
  });
});
