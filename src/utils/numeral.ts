import numeral from 'numeral';
import getSymbolFromCurrency from 'currency-symbol-map';

export function formatMoney(amount: number) {
  return numeral(amount).format('0,0');
}

export function formatMoneyWithCurreny(amount: number, currency: string) {
  return getSymbolFromCurrency(currency) ? `${getSymbolFromCurrency(currency)} ${formatMoney(amount)}` : `${formatMoney(amount)} ${currency}`
}
