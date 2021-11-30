import { render } from '@testing-library/react';

import App from './app';

xdescribe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome to meta-react!')).toBeTruthy();
  });
});
