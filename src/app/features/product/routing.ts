import * as express from "express";
import { ProductController } from "./product.controller";

export interface ProductRoutingDependencies {
  productController: ProductController;
}

export const productRouting = ({
  productController,
}: ProductRoutingDependencies) => {
  const router = express.Router();
  router.get("/", productController.getAll);
  router.get("/:id", productController.get);
  router.post("/", productController.store);
  router.put("/:id", productController.update);
  router.delete("/:id", productController.destroy);

  return router;
};
