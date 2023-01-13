import { AwilixContainer, asClass } from "awilix";
import { Controller as ProductController } from "../app/features/product/product.controller";
import { Controller as UserController } from "../app/features/user/user.controller";
import { Controller as CartController } from "../app/features/cart/cart.controller";

export const registerControllers = async (container: AwilixContainer) => {
  container.register({
    productController: asClass(ProductController),
    userController: asClass(UserController),
    cartController: asClass(CartController),
  });
};
