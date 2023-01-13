import { Request, Response } from "express";
import { UserService } from "./user.service";

export interface UserControllerDependencies {
  userService: UserService;
}

export interface UserController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}

export class Controller implements UserController {
  private dependencies: UserControllerDependencies;

  constructor(dependencies: UserControllerDependencies) {
    this.dependencies = dependencies;
  }

  register = async (req: Request, res: Response) => {
    const { userService } = this.dependencies;
    const { name, email, password } = req.body;
    const user = await userService.create({ name, email, password });

    res.status(200).json({
      user,
    });
  };

  login = async (req: Request, res: Response) => {
    const { userService } = this.dependencies;
    const { email, password } = req.body;
    const token = await userService.getJwtToken({ email, password });

    res.status(200).json({
      token,
    });
  };

  logout = async (req: Request, res: Response) => {
    const { userService } = this.dependencies;
    const { token } = req.body;
    const isTokenRemoved = await userService.removeJwtToken(token);

    res.status(200).json({
      isTokenRemoved,
    });
  };
}
