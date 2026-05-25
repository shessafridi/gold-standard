export const searchParamSerializer = (
  search: Record<string, string | number | (string | number)[]>
) =>
  Object.entries(search)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (!value.length) return '';
        return value
          .map((_, i) => (value[i] ? `${key}=${value[i].toString()}` : ''))
          .filter(v => !!v)
          .join('&');
      }
      return value ? `${key}=${value.toString()}` : '';
    })
    .filter(d => !!d)
    .join('&');
