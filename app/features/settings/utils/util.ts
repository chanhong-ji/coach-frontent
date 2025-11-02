export function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "KRW" });
}
