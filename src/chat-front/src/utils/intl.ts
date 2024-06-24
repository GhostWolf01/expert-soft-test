export const intl = new Intl.DateTimeFormat('ua-UA', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

export function intlFormat(data: number | Date) {
  return intl.format(data).replace(',', '');
}
