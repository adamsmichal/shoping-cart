import {
  Cart,
  AddProductToCartInput,
  RemoveProductFromCartInput,
} from "./cart.model";
import { CartRepository } from "./repositories/cart.repository.types";

export interface CartServiceDependencies {
  cartRepository: CartRepository;
}

export interface CartService {
  create(userId: string): Promise<Cart>;
  addProduct(addProductInput: AddProductToCartInput): Promise<Cart>;
  removeProduct(removeProductInput: RemoveProductFromCartInput): Promise<Cart>;
}

export class Service implements CartService {
  private dependencies: CartServiceDependencies;

  constructor(dependencies: CartServiceDependencies) {
    this.dependencies = dependencies;
  }

  create = async (userId: string) => {
    const { cartRepository } = this.dependencies;
    const cart = await cartRepository.create(userId);

    return cart;
  };

  addProduct = async ({
    cartId,
    productId,
    quantity,
  }: AddProductToCartInput) => {
    const { cartRepository } = this.dependencies;
    const cart = await cartRepository.assignProduct({
      cartId,
      productId,
      quantity,
    });

    return cart;
  };

  removeProduct = async ({ cartId, productId }: AddProductToCartInput) => {
    const { cartRepository } = this.dependencies;
    const cart = await cartRepository.unassignProduct({
      cartId,
      productId,
    });

    return cart;
  };
}
