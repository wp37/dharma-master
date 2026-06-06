export function arr<T>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

export function str(v: any, fallback = 'chưa đủ dữ liệu'): string {
  return typeof v === 'string' && v.trim() ? v : fallback;
}

export function num(v: any, fallback = 0): number {
  if (typeof v === 'number') return v;
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}
