import { parseISO, format } from "date-fns";
export function formatMMMDDYYYY(date: string) {
  try {
    return format(parseISO(date), "MMM do, yyyy");
  } catch {
    return 'UNKNOWN';
  }
}
export function formatYYYYMMMDD(date: string) {
  try {
    return format(parseISO(date), "yyyy.MM.dd");
  } catch {
    return 'UNKNOWN';
  }
}
