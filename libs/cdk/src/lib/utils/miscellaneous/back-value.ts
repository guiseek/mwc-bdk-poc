import { hasValue } from './has-value'

/**
 * If the value is null or undefined, returns default value
 * @param value
 * @param fallback alternative fallback
 */
export function backValue<T>(value: T | null | undefined, fallback: T): T {
  return hasValue(value) ? value : fallback
}
