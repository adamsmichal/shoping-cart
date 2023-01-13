export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
};

export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
};

export type NewUserData = {
  name: string;
  email: string;
  password: string;
  salt: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};
