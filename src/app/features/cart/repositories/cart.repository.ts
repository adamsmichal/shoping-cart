import { Prisma } from "@prisma/client";
import { CartRepository } from "./cart.repository.types";
import {
  AddProductToCartInput,
  Cart,
  RemoveProductFromCartInput,
} from "../cart.model";

export class CartPrismaRepository implements CartRepository {
  private repository: Prisma.CartDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor({
    repository,
  }: {
    repository: Prisma.CartDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
  }) {
    this.repository = repository;
  }

  async create(userId: string): Promise<Cart> {
    const response = await this.repository.create({
      data: {
        userId,
      },
    });

    return response;
  }

  async assignProduct({
    cartId,
    productId,
    quantity,
  }: AddProductToCartInput): Promise<Cart> {
    const response = await this.repository.update({
      where: {
        id: cartId,
      },
      data: {
        productsOnCart: {
          create: [
            {
              productId,
              quantity,
            },
          ],
        },
      },
    });

    return response;
  }

  async unassignProduct({
    cartId,
    productId,
  }: RemoveProductFromCartInput): Promise<Cart> {
    const response = await this.repository.update({
      where: {
        id: cartId,
      },
      data: {
        productsOnCart: {
          disconnect: [
            {
              productId_cartId: {
                productId,
                cartId,
              },
            },
          ],
        },
      },
    });

    return response;
  }
}
