import { render } from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Card
        header={
          <div>
            <p>this is some header text</p>
          </div>
        }
        body={<div>body text</div>}
        footer={<div>footer text</div>}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(
      <Card
        header={
          <div>
            <p>this is some header text</p>
          </div>
        }
        body={<div>body text</div>}
        footer={<div>footer text</div>}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
