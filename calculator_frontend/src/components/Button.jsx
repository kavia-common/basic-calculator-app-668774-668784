import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ label, ariaLabel, onClick, className = '', disabled = false }) {
  /** Accessible calculator button. */
  return (
    <button
      type="button"
      className={className || 'btn'}
      aria-label={ariaLabel || label}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
