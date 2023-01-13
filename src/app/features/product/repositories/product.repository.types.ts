import { NewProductData, Product } from "../product.model";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getOne(id: number): Promise<Product | null>;
  create(newProduct: NewProductData): Promise<Product>;
  update(id: number, productUpdateInput: NewProductData): Promise<Product>;
  delete(id: number): Promise<Product>;
}
