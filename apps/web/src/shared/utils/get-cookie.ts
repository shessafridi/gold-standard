export function getCookie(name: string) {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const pair of cookies) {
    const [k, ...vParts] = pair.split('=');
    const v = vParts.join('=');
    if (k === name) return decodeURIComponent(v);
  }
  return null;
}
