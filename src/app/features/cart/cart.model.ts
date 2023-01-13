export type Cart = {
  id: string;
  userId: string | null;
};

export type AddProductToCartInput = {
  cartId: string;
  productId: number;
  quantity: number;
};

export type RemoveProductFromCartInput = {
  cartId: string;
  productId: number;
};
