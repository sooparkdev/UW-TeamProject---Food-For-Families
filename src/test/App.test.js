// Import Libraries
import { render, screen } from '@testing-library/react';
import App from '../App';

// TODO: Fix this so testing works
test(`Renders the 'Food for Friends' title`, () => {
  // Render the App
  render( <App /> );
  const title = screen.getByText("Food for Friends");

  expect(title).toBeInTheDocument();
});
