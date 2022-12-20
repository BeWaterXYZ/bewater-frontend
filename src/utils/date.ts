import { parseISO, format } from 'date-fns';
export function formatMMMDDYYYY(date: string) {
  return format(parseISO(date), 'MMM dd, yyyy');
}
