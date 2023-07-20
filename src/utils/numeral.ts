import numeral from 'numeral';
export function formatMoney(amount: number) {
  return numeral(amount).format('0,0');
}
