/**
 * Generate human-friendly reference IDs for inquiry tracking
 * Example: TEZ-26-8942
 */
export function generateReferenceId(): string {
  const yearSuffix = new Date().getFullYear().toString().slice(-2);
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TEZ-${yearSuffix}-${randomChars}`;
}
