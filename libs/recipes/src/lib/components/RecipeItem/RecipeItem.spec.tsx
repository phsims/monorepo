import { render } from '@testing-library/react';

import RecipeItem from './RecipeItem';
import { Recipe } from '../../api/schemas';

const props: Recipe = {
  url: '',
  method: [],
  name: 'Chicken burger',
  description: 'this is a tasty burger',
  rating: 2,
  image: '/images/Cook/burger.png',
  id: '',
  author: '',
  ingredients: [],
};

describe('RecipeItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipeItem {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render match snapshot', () => {
    const { baseElement } = render(<RecipeItem {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
