import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/User.Repository";



interface IRequest {
  name: string,
  email: string,
  password: string
};

class CreateUserService {
  public async execute({name, email, password}: IRequest): Promise<User> {    
    
    //Importando o repositório.
    const usersRepository = getCustomRepository(UsersRepository);
    
    const emailExists = await usersRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('There is already one user with this email registered!');
    }
    const user = await usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user)
    return user;

  }
}

export default CreateUserService;