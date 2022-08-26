import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { compare, hash } from "bcryptjs";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest{
  id: string
  name: string,
  email: string
}

class UpdateCustomerService {
  public async execute({id,name,email}: IRequest): Promise<Customer> {
    
    //Instanciando o nosso repositório;
    const customersRepository = getCustomRepository(CustomersRepository);
    
    const customer = await customersRepository.findById(id);    
    if(!customer){
      throw new AppError('Customer not found.', 404)
    };

    const customerExists = await customersRepository.findByEmail(email);
    if(!customerExists){
      throw new AppError('Email not found.')
    };
    
    if(customerExists && email != customer.email){
      throw new AppError('There is already one customer with this email.')
    }

      customer.name = name;
      customer.email = email;

      await customersRepository.save(customer)
      return customer;

  }


}

export default UpdateCustomerService;