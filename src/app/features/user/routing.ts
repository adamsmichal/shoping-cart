import * as express from "express";
import { UserController } from "./user.controller";

export interface UserRoutingDependencies {
  userController: UserController;
}

export const userRouting = ({ userController }: UserRoutingDependencies) => {
  const router = express.Router();
  router.post("/register", userController.register);
  router.post("/login", userController.login);
  router.get("/logout", userController.logout);

  return router;
};
