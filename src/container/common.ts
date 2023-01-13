import type { AwilixContainer } from "awilix/lib/container";
import { asClass, asFunction, asValue } from "awilix/lib/resolvers";
import { createRouter } from "../app/router";
import { authConfig } from "../config/auth";
import { cacheClient } from "../tools/cache-client";
import { JwtAuthClient } from "../shared/authentication/jwt/jwt-auth";
import { JwtClient } from "../shared/authentication/jwt/jwt-client";

export const registerCommonDependencies = async (
  container: AwilixContainer
) => {
  await cacheClient.connect();
  container.register({
    router: asFunction(createRouter).singleton(),
    authConfig: asValue(authConfig),
    cacheClient: asValue(cacheClient),
    authClient: asClass(JwtAuthClient),
    jwtClient: asClass(JwtClient),
  });

  return container;
};
