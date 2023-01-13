import * as express from "express";
import { CartController } from "./cart.controller";

export interface CartRoutingDependencies {
  cartController: CartController;
}

export const cartRouting = ({ cartController }: CartRoutingDependencies) => {
  const router = express.Router();
  router.post("/", cartController.store);
  router.post("/product/add", cartController.addProduct);
  router.post("/product/remove", cartController.removeProduct);
  router.get("/:id", cartController.get);
  router.get("/:id/summary", cartController.getSummary);

  return router;
};
