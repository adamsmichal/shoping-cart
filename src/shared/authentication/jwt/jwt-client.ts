import { sign, verify } from "jsonwebtoken";
import { CreateTokenError } from "../errors/create-token.error";
import { JwtPayload } from "./jwt-payload.types";
import { RequireTokenError } from "../errors/require-token.error";
import { ExpiredTokenError } from "../errors/expired-token.error";
import { AuthConfig } from "../../../config/auth";
import { InvalidTokenError } from "../errors/invalid-token.error";

export interface JwtClientProps {
  authConfig: AuthConfig;
}

export class JwtClient {
  constructor(private dependencies: JwtClientProps) {}

  generateToken(data: JwtPayload): string {
    const { authConfig } = this.dependencies;
    try {
      const token = sign({ ...data }, authConfig.secret, {
        expiresIn: authConfig.expirationInMinutes * 60,
      });
      return token;
    } catch (err) {
      console.log(err);
      throw new CreateTokenError("error.create.token");
    }
  }

  verifyToken(token: string | undefined): boolean {
    const { authConfig } = this.dependencies;

    if (token === undefined) {
      throw new RequireTokenError("error.require.token");
    }

    try {
      verify(this.prepareToken(token), authConfig.secret);
    } catch (err) {
      throw new ExpiredTokenError("error.token.expired");
    }

    return true;
  }

  getTokenPayload(token: string) {
    const { authConfig } = this.dependencies;

    try {
      const tokenPayload = verify(this.prepareToken(token), authConfig.secret);
      return tokenPayload;
    } catch (err) {
      throw new InvalidTokenError("error.token.invalid");
    }
  }

  private prepareToken(token: string): string {
    return token.replace("Bearer", "");
  }
}
