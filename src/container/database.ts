import { AwilixContainer, asClass, asValue } from "awilix";
import { prisma } from "../config/db";
import { ProductPrismaRepository } from "../app/features/product/repositories/product.repository";
import { UserPrismaRepository } from "../app/features/user/repositories/user.repository";
import { CartPrismaRepository } from "../app/features/cart/repositories/cart.repository";

export async function registerDatabase(container: AwilixContainer) {
  container.register({
    productRepository: asClass(ProductPrismaRepository).inject(() => ({
      repository: prisma.product,
    })),
    userRepository: asClass(UserPrismaRepository).inject(() => ({
      repository: prisma.user,
    })),
    cartRepository: asClass(CartPrismaRepository).inject(() => ({
      repository: prisma.cart,
    })),
  });
}
