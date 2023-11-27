import { render } from '@testing-library/react';

import Importer from './Importer';

describe('Importer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Importer
        onSubmit={function (data: unknown): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(
      <Importer
        onSubmit={function (data: unknown): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
