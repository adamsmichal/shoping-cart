import { AuthClient, Token } from "../auth.types";
import { JwtClient } from "./jwt-client";
import { hashValue, hashWithSha512 } from "../../crypto";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { RequireTokenError } from "../errors/require-token.error";
import { User } from "../../../app/features/user/user.model";
import { CacheClient } from "../../../tools/cache-client";
import { AuthConfig } from "../../../config/auth";

interface JwtAuthDependencies {
  jwtClient: JwtClient;
  cacheClient: CacheClient;
  authConfig: AuthConfig;
}

export class JwtAuthClient implements AuthClient {
  constructor(private dependencies: JwtAuthDependencies) {}

  login(user: User | null, password: string) {
    const { jwtClient } = this.dependencies;

    if (!user || user.password !== hashWithSha512(password, user.salt)) {
      throw new UnauthorizedError("error.unauthorized");
    }

    const data = {
      userId: user.id,
    };

    const token = jwtClient.generateToken(data);
    return token;
  }

  async logout(token: string): Promise<boolean> {
    const { cacheClient, authConfig } = this.dependencies;
    await cacheClient.set(token, token, authConfig.expirationInMinutes * 60);
    return true;
  }

  isAuthenticated(accessToken: string | undefined): boolean {
    const { jwtClient } = this.dependencies;
    return jwtClient.verifyToken(accessToken);
  }

  decodeToken(token: string | undefined): Token {
    const { jwtClient } = this.dependencies;
    if (token === undefined) {
      throw new RequireTokenError("error.require.token");
    }
    const tokenPayload = jwtClient.getTokenPayload(token) as Token;
    return tokenPayload;
  }

  hashPassword(password: string) {
    return hashValue(password, hashWithSha512);
  }
}
