import express from "express";
import helmet from "helmet";
import cors from "cors";
import { NotFoundError } from "../errors/not-found.error";

export interface AppDependencies {
  router: express.Router;
}

const createApp = async ({ router }: AppDependencies) => {
  const app = express();
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    })
  );

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
    });
  });

  app.use("/api", router);
  app.use("*", (req, res, next) => next(new NotFoundError("Not found")));

  return app;
};

export { createApp };
