import * as express from "express";

export interface RoutingDependencies {
  productRouting: express.Router;
  userRouting: express.Router;
  cartRouting: express.Router;
}

export const createRouter = ({
  productRouting,
  userRouting,
  cartRouting,
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/product", productRouting);
  router.use("/user", userRouting);
  router.use("/cart", cartRouting);
  return router;
};
