import { parseISO, format } from "date-fns";
export function formatMMMDDYYYY(date: string) {
  return format(parseISO(date), "MMM do, yyyy");
}
export function formatYYYYMMMDD(date: string) {
  return format(parseISO(date), "yyyy.MM.dd");
}
