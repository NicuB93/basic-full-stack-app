export type JwtDataType = {
  iat: number;
  exp: number;
  email: string;
  sub: string;
};

export function parseJwtSSR(token?: string): JwtDataType | null {
  if (!token) {
    return null;
  }

  const [, payload] = token.split('.');

  if (!payload) {
    return null;
  }

  return JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
  );
}
