export const searchParamSerializer = (search: {
  [x: string]: string | number | (string | number)[];
}) =>
  Object.entries(search)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (!value.length) return '';
        return value
          .map((_, i) => (value?.[i] ? `${key}=${value?.[i]}` : ''))
          .filter(v => !!v)
          .join('&');
      }
      return value ? `${key}=${value}` : '';
    })
    .filter(d => !!d)
    .join('&');
