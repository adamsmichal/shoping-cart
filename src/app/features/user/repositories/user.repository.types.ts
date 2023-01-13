import { UserCreateInput, User } from "../user.model";

export interface UserRepository {
  create(newUser: UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
