import { User } from "@prisma/client";

export interface AuthClient {
  login(user: User | null, password: string): string;
  logout(token: string): Promise<boolean>;
  hashPassword(password: string): PasswordData;
  decodeToken(token: string | undefined): Token;
  isAuthenticated(accessToken: string | undefined): boolean;
}

export interface PasswordData {
  hash: string;
  salt: string;
}

export interface Token {
  userId: string;
  iat: number;
  exp: number;
}
