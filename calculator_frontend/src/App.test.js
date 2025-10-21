import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders calculator and performs a simple operation', () => {
  render(<App />);
  // display should exist
  const display = screen.getByRole('region', { name: /calculator display/i });
  expect(display).toBeInTheDocument();

  // Click 7 + 5 =
  fireEvent.click(screen.getByRole('button', { name: /digit 7/i }));
  fireEvent.click(screen.getByRole('button', { name: /add/i }));
  fireEvent.click(screen.getByRole('button', { name: /digit 5/i }));
  fireEvent.click(screen.getByRole('button', { name: /equals/i }));

  // Expect 12
  expect(display).toHaveTextContent('12');
});

test('division by zero shows error', () => {
  render(<App />);
  const display = screen.getByRole('region', { name: /calculator display/i });

  fireEvent.click(screen.getByRole('button', { name: /digit 9/i }));
  fireEvent.click(screen.getByRole('button', { name: /divide/i }));
  fireEvent.click(screen.getByRole('button', { name: /digit 0/i }));
  fireEvent.click(screen.getByRole('button', { name: /equals/i }));

  expect(display).toHaveTextContent(/cannot divide by zero/i);
});
