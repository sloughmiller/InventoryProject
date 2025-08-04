import { jwtDecode } from 'jwt-decode';


interface TokenPayload {
  sub: string; // UUID
  exp: number;
}

export function decodeUserIdFromToken(token: string): string {
  const decoded = jwtDecode<TokenPayload>(token);
  return decoded.sub;
}
