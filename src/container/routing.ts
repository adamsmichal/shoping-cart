import { AwilixContainer, asFunction } from "awilix";
import { productRouting } from "../app/features/product/routing";
import { userRouting } from "../app/features/user/routing";
import { cartRouting } from "../app/features/cart/routing";

export const registerRouting = async (container: AwilixContainer) => {
  container.register({
    productRouting: asFunction(productRouting),
    userRouting: asFunction(userRouting),
    cartRouting: asFunction(cartRouting),
  });
};
