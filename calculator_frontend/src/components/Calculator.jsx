import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { fmtNumber } from '../theme';

// Helpers
const isDigit = (k) => /^[0-9]$/.test(k);

// PUBLIC_INTERFACE
export function calculateBinary(a, op, b) {
  /**
   * Performs a binary operation on two operands.
   * a and b should be numbers. Returns number or 'DIV_ZERO' sentinel for divide by zero.
   */
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'DIV_ZERO' : a / b;
    default: return b;
  }
}

// PUBLIC_INTERFACE
export default function Calculator() {
  /**
   * Calculator holds minimal state:
   * - currentInput: string for the current number being typed
   * - previous: number | null (left operand)
   * - operator: '+','-','*','/' | null
   * - overwrite: when true, the next digit press starts a new number
   * - error: string | null for displaying errors (e.g., divide by zero)
   */
  const [currentInput, setCurrentInput] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState(null);

  const allowEquals = !error;

  const displayExpression = useMemo(() => {
    if (error) return '';
    if (previous !== null && operator) {
      return `${fmtNumber(previous)} ${operator}`;
    }
    return '';
  }, [previous, operator, error]);

  const pushDigit = useCallback((d) => {
    if (error) return;
    setCurrentInput((prev) => {
      if (overwrite) {
        setOverwrite(false);
        return d === '.' ? '0.' : d;
      }
      // prevent multiple leading zeros
      if (prev === '0' && d !== '.' && !prev.includes('.')) {
        return d;
      }
      // prevent multiple decimals
      if (d === '.' && prev.includes('.')) {
        return prev;
      }
      // append
      return prev + d;
    });
  }, [overwrite, error]);

  const handleBackspace = useCallback(() => {
    if (error) return;
    setCurrentInput((prev) => {
      if (overwrite) {
        setOverwrite(false);
        return '0';
      }
      if (prev.length <= 1) return '0';
      const trimmed = prev.slice(0, -1);
      return trimmed === '' || trimmed === '-' ? '0' : trimmed;
    });
  }, [overwrite, error]);

  const clearAll = useCallback(() => {
    setCurrentInput('0');
    setPrevious(null);
    setOperator(null);
    setOverwrite(false);
    setError(null);
  }, []);

  const clearEntry = useCallback(() => {
    if (error) return clearAll();
    setCurrentInput('0');
    setOverwrite(false);
  }, [error, clearAll]);

  const applyOperator = useCallback((op) => {
    if (error) return;
    const curr = Number(currentInput);
    if (previous === null) {
      setPrevious(curr);
      setOperator(op);
      setOverwrite(true);
      return;
    }
    // Chain operations
    if (operator) {
      const result = calculateBinary(previous, operator, curr);
      if (result === 'DIV_ZERO') {
        setError('Cannot divide by zero');
        return;
      }
      setPrevious(result);
      setOperator(op);
      setOverwrite(true);
      setCurrentInput(String(result));
    } else {
      setOperator(op);
      setPrevious(curr);
      setOverwrite(true);
    }
  }, [currentInput, previous, operator, error]);

  const calculateEquals = useCallback(() => {
    if (error) return;
    if (previous === null || !operator) return;
    const a = previous;
    const b = Number(currentInput);
    const result = calculateBinary(a, operator, b);
    if (result === 'DIV_ZERO') {
      setError('Cannot divide by zero');
      return;
    }
    setCurrentInput(String(result));
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }, [currentInput, operator, previous, error]);

  // Keyboard handling
  const onKeyDown = useCallback((e) => {
    const { key } = e;
    if (isDigit(key)) {
      e.preventDefault();
      pushDigit(key);
      return;
    }
    if (key === '.') {
      e.preventDefault();
      pushDigit('.');
      return;
    }
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      e.preventDefault();
      applyOperator(key);
      return;
    }
    if (key === 'Enter' || key === '=') {
      e.preventDefault();
      if (allowEquals) calculateEquals();
      return;
    }
    if (key === 'Backspace') {
      e.preventDefault();
      handleBackspace();
      return;
    }
    if (key.toLowerCase() === 'c') {
      e.preventDefault();
      clearEntry();
      return;
    }
    if (key.toLowerCase() === 'a') {
      // interpret "AC" via Shift+a or not? Keep C as CE, allow Escape for AC
      return;
    }
    if (key === 'Escape') {
      e.preventDefault();
      clearAll();
    }
  }, [pushDigit, applyOperator, calculateEquals, handleBackspace, clearEntry, clearAll, allowEquals]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Simple sanity check (not a full test suite)
  const sanityRef = useRef(false);
  useEffect(() => {
    if (sanityRef.current) return;
    sanityRef.current = true;
    // 2 + 3 = 5
    const r = calculateBinary(2, '+', 3);
    if (r !== 5) {
      // eslint-disable-next-line no-console
      console.warn('Sanity check failed: 2 + 3 should be 5');
    }
  }, []);

  return (
    <div className="calculator" aria-label="Calculator" tabIndex={0}>
      <Display
        expression={displayExpression}
        value={currentInput}
        error={error}
      />
      <Keypad
        onDigit={(d) => pushDigit(d)}
        onOperator={(op) => applyOperator(op)}
        onEquals={() => allowEquals && calculateEquals()}
        onClear={clearAll}
        onClearEntry={clearEntry}
        onBackspace={handleBackspace}
        equalsDisabled={!allowEquals}
      />
      <div className="kbd-hints" aria-hidden="true">
        <span className="kbd">0-9</span>
        <span className="kbd">.</span>
        <span className="kbd">+ - * /</span>
        <span className="kbd">Enter</span>
        <span className="kbd">Backspace</span>
        <span className="kbd">C / Esc</span>
      </div>
    </div>
  );
}
