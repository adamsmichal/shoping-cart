import { Prisma } from "@prisma/client";
import { UserRepository } from "./user.repository.types";
import { User, NewUserData } from "../user.model";

export class UserPrismaRepository implements UserRepository {
  private repository: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor({
    repository,
  }: {
    repository: Prisma.UserDelegate<
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
  }) {
    this.repository = repository;
  }

  create = async ({
    name,
    email,
    password,
    salt,
  }: NewUserData): Promise<User> => {
    const response = await this.repository.create({
      data: {
        name,
        email,
        password,
        salt,
      },
    });
    return response;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const response = await this.repository.findUnique({
      where: {
        email,
      },
    });

    return response;
  };
}
