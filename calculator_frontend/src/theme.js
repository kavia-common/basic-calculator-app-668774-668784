export const theme = {
  // Ocean Professional palette
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#06b6d4',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
};

// PUBLIC_INTERFACE
export function fmtNumber(value) {
  /** Formats a number for display with up to 10 fractional digits, trimming trailing zeros. */
  if (value === null || value === undefined || Number.isNaN(value)) return '0';
  const asStr = String(value);
  if (asStr.includes('e') || asStr.length > 14) return value.toString();
  const n = Number(value);
  return n.toLocaleString(undefined, { maximumFractionDigits: 10 });
}
