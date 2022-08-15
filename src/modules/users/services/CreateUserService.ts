import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
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
      throw new AppError('User already exists!');
    }

    //criando o hash da senha antes de inserir no banco.
    const hashedPassword = await hash(password, 8)

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user)
    return user;

  }
}

export default CreateUserService;