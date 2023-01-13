export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductInput = {
  name: string;
  price: number;
  image: File;
};

export type NewProductData = {
  name: string;
  price: number;
  imageUrl: string;
};
