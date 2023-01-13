import { Product, ProductInput } from "./product.model";
import { ProductRepository } from "./repositories/product.repository.types";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
});

export interface ProductServiceDependencies {
  productRepository: ProductRepository;
}

export interface ProductService {
  getAll(): Promise<Product[]>;
  getOne(productId: number): Promise<Product | null>;
  create(productInputData: ProductInput): Promise<Product>;
  update(productId: number, productUpdateData: ProductInput): Promise<Product>;
  delete(productId: number): Promise<Product>;
}

export class Service implements ProductService {
  private dependencies: ProductServiceDependencies;

  constructor(dependencies: ProductServiceDependencies) {
    this.dependencies = dependencies;
  }

  getAll = async () => {
    const { productRepository } = this.dependencies;
    const allProducts = await productRepository.getAll();
    return allProducts;
  };

  getOne = async (productId: number) => {
    const { productRepository } = this.dependencies;
    const product = await productRepository.getOne(productId);
    return product;
  };

  create = async ({ name, price, image }: ProductInput) => {
    const { productRepository } = this.dependencies;
    const newProductData = {
      name,
      price,
      imageUrl: "temp",
    };
    const product = await productRepository.create(newProductData);

    return product;
  };

  update = async (productId: number, { name, price, image }: ProductInput) => {
    const { productRepository } = this.dependencies;
    const product = await productRepository.update(productId, {
      name,
      price,
      imageUrl: "temp",
    });

    return product;
  };

  delete = async (productId: number) => {
    const { productRepository } = this.dependencies;
    const product = await productRepository.delete(productId);

    return product;
  };
}
