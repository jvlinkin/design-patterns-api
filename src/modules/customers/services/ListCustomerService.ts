import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";



class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    
    //Importando o repositório.
    const customersRespository = getCustomRepository(CustomersRepository);
    
    const customers = await customersRespository.find();
    return customers;

  }
}

export default ListCustomerService;