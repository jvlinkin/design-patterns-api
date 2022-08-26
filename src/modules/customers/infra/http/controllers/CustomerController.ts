import { Request, Response } from "express";
import ListCustomerService from "@modules/customers/services/ListCustomerService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";


export default class CustomersController {

  //Serviço de listar.
  public async index(req: Request, res: Response): Promise<Response>{
    const listCustomers = new ListCustomerService()
    const customers = await listCustomers.execute()

    return res.json(customers);
  }

  //Serviço de mostrar.
  public async show(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;
    const showCustomer = new ShowCustomerService();
    const customer = await showCustomer.execute({id});

    return res.json(customer);
  }

  //Serviço de criar.
  public async create(req: Request, res: Response): Promise<Response>{
    const {name, email} = req.body;
    
    const createCustomer = new CreateCustomerService();    
    const customer = await createCustomer.execute({name,email});

    return res.json(customer);
  }

  //Serviço de atualizar.
  public async update(req: Request, res: Response): Promise<Response>{
    const {id} = req.params;
    const {name, email} = req.body;    

    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({id,name,email})
    
    return res.json(customer);
  }

  //Serviço de deletar;
  public async delete(req: Request, res: Response): Promise<Response | undefined>{
    const {id} = req.params;

    const deleteCustomer = new DeleteCustomerService()
    await deleteCustomer.execute({id});
    
    return res.json({msg: 'Customer deleted successfully.'})
    
  }
}