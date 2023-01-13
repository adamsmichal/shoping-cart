import { Request, Response } from "express";
import { ProductService } from "./product.service";

export interface ProductControllerDependencies {
  productService: ProductService;
}

export interface ProductController {
  getAll(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  store(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  destroy(req: Request, res: Response): Promise<void>;
}

export class Controller implements ProductController {
  private dependencies: ProductControllerDependencies;

  constructor(dependencies: ProductControllerDependencies) {
    this.dependencies = dependencies;
  }

  getAll = async (_: Request, res: Response) => {
    const { productService } = this.dependencies;
    const allProducts = await productService.getAll();

    res.status(200).json({
      products: allProducts,
    });
  };

  get = async (req: Request, res: Response) => {
    const { productService } = this.dependencies;
    const product = await productService.getOne(+req.params.id);

    res.status(200).json({
      product,
    });
  };

  store = async (req: Request, res: Response) => {
    const { productService } = this.dependencies;
    const { name, price, image } = req.body;
    const product = await productService.create({ name, price, image });

    res.status(200).json({
      product,
    });
  };

  update = async (req: Request, res: Response) => {
    const { productService } = this.dependencies;
    const product = await productService.update(+req.params.id, req.body);

    res.status(200).json({
      product,
    });
  };

  destroy = async (req: Request, res: Response) => {
    const { productService } = this.dependencies;
    const product = await productService.delete(+req.params.id);

    res.status(200).json({
      product,
    });
  };
}
