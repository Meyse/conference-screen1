/**
 * formatters.ts
 * 
 * Utility functions for formatting numbers and other display values
 * for the conference dashboard screens.
 */

/**
 * Format a number as currency with appropriate abbreviations
 * for large values (K, M, B, T)
 */
export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Format a number with appropriate abbreviations (K, M, B, T)
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toString();
}

/**
 * Format a percentage value with a + or - sign
 */
export function formatPercentage(value: number, isPositive: boolean): string {
  const sign = isPositive ? '+' : '-';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

/**
 * Format a metric value based on its type and optional prefix/suffix
 */
export function formatMetricValue(
  value: string | number,
  prefix?: string,
  suffix?: string
): string {
  let formattedValue = typeof value === 'number' ? formatNumber(value) : value;
  
  if (prefix) {
    formattedValue = `${prefix}${formattedValue}`;
  }
  
  if (suffix) {
    formattedValue = `${formattedValue}${suffix}`;
  }
  
  return formattedValue;
} 