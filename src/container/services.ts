import { AwilixContainer, asClass } from "awilix";
import { Service as ProductService } from "../app/features/product/product.service";
import { Service as UserService } from "../app/features/user/user.service";
import { Service as CartService } from "../app/features/cart/cart.service";

export const registerServices = async (container: AwilixContainer) => {
  container.register({
    productService: asClass(ProductService),
    userService: asClass(UserService),
    cartService: asClass(CartService),
  });
};
