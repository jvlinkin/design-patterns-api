import AppError from "@shared/errors/AppError";
import { response, Response } from "express";
import { getCustomRepository } from "typeorm"
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest{
  id: string;
}

class DeleteCustomerService {
  public async execute({id}: IRequest): Promise<void> {
    
    //Importando o repositório.
    const customersRepository = getCustomRepository(CustomersRepository);
    
    const customer = await customersRepository.findById(id);
    
    if(!customer){
      throw new AppError('Customer not found.', 404)
    };

    await customersRepository.remove(customer);
    
    

  }
}

export default DeleteCustomerService;