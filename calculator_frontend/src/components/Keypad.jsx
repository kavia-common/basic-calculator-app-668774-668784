import React from 'react';
import Button from './Button';

// PUBLIC_INTERFACE
export default function Keypad({
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  equalsDisabled,
}) {
  /** Renders calculator buttons with accessible labels and roles. */
  return (
    <div className="keypad" role="group" aria-label="Calculator keypad">
      <Button label="AC" ariaLabel="All clear" className="btn btn-ac" onClick={onClear} />
      <Button label="C" ariaLabel="Clear entry" className="btn btn-utility" onClick={onClearEntry} />
      <Button label="⌫" ariaLabel="Backspace" className="btn btn-utility" onClick={onBackspace} />
      <Button label="÷" ariaLabel="Divide" className="btn btn-op" onClick={() => onOperator('/')} />

      <Button label="7" ariaLabel="Digit 7" className="btn" onClick={() => onDigit('7')} />
      <Button label="8" ariaLabel="Digit 8" className="btn" onClick={() => onDigit('8')} />
      <Button label="9" ariaLabel="Digit 9" className="btn" onClick={() => onDigit('9')} />
      <Button label="×" ariaLabel="Multiply" className="btn btn-op" onClick={() => onOperator('*')} />

      <Button label="4" ariaLabel="Digit 4" className="btn" onClick={() => onDigit('4')} />
      <Button label="5" ariaLabel="Digit 5" className="btn" onClick={() => onDigit('5')} />
      <Button label="6" ariaLabel="Digit 6" className="btn" onClick={() => onDigit('6')} />
      <Button label="−" ariaLabel="Subtract" className="btn btn-op" onClick={() => onOperator('-')} />

      <Button label="1" ariaLabel="Digit 1" className="btn" onClick={() => onDigit('1')} />
      <Button label="2" ariaLabel="Digit 2" className="btn" onClick={() => onDigit('2')} />
      <Button label="3" ariaLabel="Digit 3" className="btn" onClick={() => onDigit('3')} />
      <Button label="+" ariaLabel="Add" className="btn btn-op" onClick={() => onOperator('+')} />

      <Button label="0" ariaLabel="Digit 0" className="btn btn-span-2" onClick={() => onDigit('0')} />
      <Button label="." ariaLabel="Decimal point" className="btn" onClick={() => onDigit('.')} />
      <Button
        label="="
        ariaLabel="Equals"
        className="btn btn-equals"
        onClick={onEquals}
        disabled={equalsDisabled}
      />
    </div>
  );
}
