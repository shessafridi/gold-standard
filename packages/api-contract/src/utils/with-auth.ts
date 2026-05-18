export const withAuth = <T>(s: T) => ({ ...s, security: [{ BearerAuth: [] }] });
