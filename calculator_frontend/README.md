# Ocean Professional Calculator (React)

Modern, minimalist calculator UI with keyboard and click input. Styled using the Ocean Professional theme.

## Features

- Basic operations: add, subtract, multiply, divide
- Keyboard input: 0-9, ., +, -, *, /, Enter(=), Backspace, C (clear entry), Esc (all clear)
- Edge cases handled:
  - Prevent multiple decimals
  - Prevent awkward leading zeros
  - Division by zero: shows error "Cannot divide by zero" until cleared
- Accessible buttons with aria labels and focus rings
- Responsive layout with subtle gradients, rounded corners, and shadows

## Quick start

1. Install dependencies
   ```
   npm install
   ```

2. Start the dev server (defaults to port 3000; your environment may map to a different port)
   ```
   npm start
   ```

3. Open http://localhost:3000

## Code Structure

- `src/components/Calculator.jsx` – state and logic, keyboard handling
- `src/components/Display.jsx` – previous expression + main value
- `src/components/Keypad.jsx` – buttons layout
- `src/components/Button.jsx` – accessible button
- `src/theme.js` – theme constants and helpers
- `src/index.css` – global styles and Ocean theme variables
- `src/App.js` – mounts the Calculator inside a centered shell

## Minimal sanity check

A very small sanity check runs in `Calculator.jsx` to ensure a simple operation (2 + 3 = 5).
For comprehensive verification consider adding React Testing Library tests.

## Notes

- Avoids `eval`. Arithmetic is implemented via a small pure function `calculateBinary(a, op, b)`.
- The equals button is disabled during error state (division by zero) until cleared.
