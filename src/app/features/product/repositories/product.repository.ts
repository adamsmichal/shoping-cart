import { Prisma } from "@prisma/client";
import { ProductRepository } from "./product.repository.types";
import { NewProductData, Product } from "../product.model";

export class ProductPrismaRepository implements ProductRepository {
  private repository: Prisma.ProductDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor({
    repository,
  }: {
    repository: Prisma.ProductDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
  }) {
    this.repository = repository;
  }

  async getAll(): Promise<Product[]> {
    const response = await this.repository.findMany();
    return response;
  }

  async getOne(id: number): Promise<Product | null> {
    const response = await this.repository.findUnique({
      where: {
        id,
      },
    });
    return response;
  }

  async create(newProduct: NewProductData): Promise<Product> {
    const { name, price, imageUrl } = newProduct;
    const response = await this.repository.create({
      data: {
        name,
        price: +price,
        imageUrl,
      },
    });
    return response;
  }

  async update(
    id: number,
    productUpdateInput: NewProductData
  ): Promise<Product> {
    const { name, price, imageUrl } = productUpdateInput;
    const response = await this.repository.update({
      where: {
        id,
      },
      data: {
        name,
        price: +price,
        imageUrl,
      },
    });

    return response;
  }

  async delete(id: number): Promise<Product> {
    const response = await this.repository.delete({
      where: {
        id,
      },
    });

    return response;
  }
}
