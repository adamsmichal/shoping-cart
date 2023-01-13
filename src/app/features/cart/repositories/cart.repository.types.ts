import {
  AddProductToCartInput,
  Cart,
  RemoveProductFromCartInput,
} from "../cart.model";

export interface CartRepository {
  create(userId: string): Promise<Cart>;
  assignProduct(addProductInput: AddProductToCartInput): Promise<Cart>;
  unassignProduct(
    removeProductInput: RemoveProductFromCartInput
  ): Promise<Cart>;
}
