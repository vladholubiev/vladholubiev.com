export function clamp(number, a, b) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.min(Math.max(number, min), max)
}
