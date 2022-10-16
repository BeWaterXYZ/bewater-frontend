export default function delay(d = 200): Promise<void> {
  return new Promise((r) => setTimeout(r, d));
}
