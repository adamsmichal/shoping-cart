import { createClient } from "redis";
import { loadEnvs } from "../config/env";

loadEnvs();

export interface CacheClient {
  MAX_REDIS_CACHE_DURATION: number;
  get(key: string): Promise<any>;
  set(key: string, data: any, duration?: number): Promise<boolean>;
}

class CustomRedisClient implements CacheClient {
  private readonly cacheClient: ReturnType<typeof createClient>;

  readonly MAX_REDIS_CACHE_DURATION = 2147483646;

  constructor() {
    this.cacheClient = createClient({ url: process.env.REDIS_URL as string });
    this.cacheClient.on("error", (err) => {
      if (err) {
        console.log(`Unhandled redis error: ${err.toString()}`, err);
      }
    });
  }

  public async connect() {
    return this.cacheClient.connect();
  }

  public async get(key: string) {
    try {
      const result = await this.cacheClient.get(key);
      if (!result) {
        return null;
      }
      return JSON.parse(result);
    } catch (err) {
      return null;
    }
  }

  public async set(
    key: string,
    data: any,
    duration: number = 1800
  ): Promise<boolean> {
    const status = await this.cacheClient.set(key, JSON.stringify(data), {
      EX: duration,
    });

    console.log(`Cache set for key: ${key}`);

    return status === "OK";
  }
}

export const cacheClient = new CustomRedisClient();
