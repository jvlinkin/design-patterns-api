import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Customer from "../entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface IRequest{
  id: string;
}

class ShowCustomerService {
  public async execute({id}: IRequest): Promise<Customer> {
    
    //Importando o repositório.
    const customersRepository = getCustomRepository(CustomersRepository);
    
    const customer = await customersRepository.findById(id);
    
    if(!customer){
      throw new AppError('Customer not found.', 404)
    };
    
    return customer;

  }
}

export default ShowCustomerService;