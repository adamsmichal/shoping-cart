import { loadEnvs } from "./env";

loadEnvs();

export interface AuthConfig {
  secret: string;
  expirationInMinutes: number;
}

const loadAuthConfigFromEnvs = () => ({
  secret: process.env.AUTH_SECRET,
  expirationInMinutes: process.env.EXPIRATION_IN_MINUTES,
});

export const authConfig = loadAuthConfigFromEnvs();
