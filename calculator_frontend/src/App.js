import React from 'react';
import './index.css';
import Calculator from './components/Calculator';

// PUBLIC_INTERFACE
export default function App() {
  /** App mounts the Ocean-styled calculator in a centered shell. */
  return (
    <div className="app-shell" role="application" aria-label="Calculator application">
      <Calculator />
    </div>
  );
}
