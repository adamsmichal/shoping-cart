import {
  LoginUserData,
  NewUserData,
  User,
  UserCreateInput,
} from "./user.model";
import { UserRepository } from "./repositories/user.repository.types";
import { AuthClient } from "../../../shared/authentication/auth.types";
import { UserAlreadyExistsError } from "./errors/user-already-exists.error";
import { CacheClient } from "../../../tools/cache-client";
import { UserDoesNotExistsError } from "./errors/user-does-not-exists.error";

export interface UserServiceDependencies {
  userRepository: UserRepository;
  authClient: AuthClient;
  cacheClient: CacheClient;
}

export interface UserService {
  create(userCreateInput: UserCreateInput): Promise<User>;
  getJwtToken(loginUserData: LoginUserData): Promise<string>;
  removeJwtToken(token: string): Promise<boolean>;
}

export class Service implements UserService {
  private dependencies: UserServiceDependencies;

  constructor(dependencies: UserServiceDependencies) {
    this.dependencies = dependencies;
  }
  create = async ({
    name,
    email,
    password,
  }: UserCreateInput): Promise<User> => {
    const { userRepository, authClient } = this.dependencies;
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser !== null) {
      throw new UserAlreadyExistsError("error.user.already.excists");
    }

    const { hash, salt } = authClient.hashPassword(password);
    const newUserData: NewUserData = {
      name,
      email,
      password: hash,
      salt,
    };
    const user = await userRepository.create(newUserData);

    return user;
  };

  getJwtToken = async ({ email, password }: LoginUserData): Promise<string> => {
    const { userRepository, authClient } = this.dependencies;
    const user = await userRepository.findByEmail(email);

    if (user === null) {
      throw new UserDoesNotExistsError("error.user.does.not.excists");
    }

    const token = authClient.login(user, password);

    return token;
  };

  removeJwtToken = async (token: string): Promise<boolean> => {
    const { authClient } = this.dependencies;
    const cacheStatus = await authClient.logout(token);
    return cacheStatus;
  };
}
