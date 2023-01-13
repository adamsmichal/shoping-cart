import { Request, Response } from "express";
import { CartService } from "./cart.service";

export interface CartControllerDependencies {
  cartService: CartService;
}

export interface CartController {
  store(req: Request, res: Response): Promise<void>;
  addProduct(req: Request, res: Response): Promise<void>;
  removeProduct(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  getSummary(req: Request, res: Response): Promise<void>;
}

export class Controller implements CartController {
  private dependencies: CartControllerDependencies;

  constructor(dependencies: CartControllerDependencies) {
    this.dependencies = dependencies;
  }

  addProduct = async (req: Request, res: Response) => {
    const { cartService } = this.dependencies;
    const { cartId, productId, quantity } = req.body;
    const cart = await cartService.addProduct({
      cartId,
      productId,
      quantity,
    });

    res.status(200).json({
      cart,
    });
  };

  removeProduct = async (req: Request, res: Response) => {
    const { cartService } = this.dependencies;
    const { cartId, productId } = req.body;
    const cart = await cartService.removeProduct({ cartId, productId });

    res.status(200).json({
      cart,
    });
  };

  store = async (req: Request, res: Response) => {
    const { cartService } = this.dependencies;
    const { userId } = req.body;
    const cart = await cartService.create(userId);

    res.status(200).json({
      cartId: cart.id,
    });
  };

  get = async (req: Request, res: Response) => {
    const { cartService } = this.dependencies;
    // const cart = await cartService.update(+req.params.id, req.body);

    res.status(200).json({
      // cart,
    });
  };

  getSummary = async (req: Request, res: Response) => {
    const { cartService } = this.dependencies;
    // const cart = await cartService.delete(+req.params.id);

    res.status(200).json({
      // cart,
    });
  };
}
