import { Request, Response } from "express";
import CreateProductService from "../../../services/CreateProductService";
import DeleteProductService from "../../../services/DeleteProductService";
import ListProductService from '../../../services/ListProductService';
import ShowProductService from "../../../services/ShowProductService";
import UpdateProductService from "../../../services/UpdateProductService";

export default class ProductsController {

  //Método de listar.
  public async index(req: Request, res: Response): Promise<Response>{
    const listProducts = new ListProductService();
    const products = await listProducts.execute()

    return res.json(products);
  }

  //Método de mostrar.
  public async show(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({id});

    return res.json(product);
  }

  //Método de criar.
  public async create(req: Request, res: Response): Promise<Response>{
    const {name, price, quantity} = req.body;
    
    const createProduct = new CreateProductService();
    
    const product = await createProduct.execute({name, price, quantity});

    return res.json(product);
  }

  //Método de atualizar.
  public async update(req: Request, res: Response): Promise<Response>{
    const {name, price, quantity} = req.body;
    const {id} = req.params;

    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({id, name, price, quantity})
    
    return res.json(product);
  }
  //Método de deletar;
  public async delete(req: Request, res: Response): Promise<Response | undefined>{
    const {id} = req.params;
    const deleteProduct = new DeleteProductService();
    const product = await deleteProduct.execute({id});
    return res.json({msg: 'Product deleted successfully.'});
  }
}