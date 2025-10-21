import React from 'react';
import { fmtNumber } from '../theme';

// PUBLIC_INTERFACE
export default function Display({ expression, value, error }) {
  /**
   * Renders the expression line and the main value line.
   * Shows error state in red and allows content to be read by screen readers.
   */
  const isErr = Boolean(error);
  const aria = isErr ? `Error: ${error}` : `Value ${value}`;

  return (
    <div className="display" role="region" aria-label="Calculator display" aria-live="polite">
      <div className="expression" aria-label="Previous expression">
        {expression}
        {isErr && ' '}
        {isErr ? ' ' : null}
      </div>
      <div className={`value ${isErr ? 'error' : ''}`} aria-label={aria}>
        {isErr ? error : fmtNumber(value)}
      </div>
    </div>
  );
}
