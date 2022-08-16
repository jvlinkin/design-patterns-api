import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/User.Repository";



interface IRequest {
  email: string,
  password: string
};

class CreateSessionsService {
  public async execute({email, password}: IRequest): Promise<User | undefined > {

    //Importando o repositório.
    const usersRepository = getCustomRepository(UsersRepository);   
    const user = await usersRepository.findByEmail(email)
    
    //Validações
    if(!user){
      throw new AppError('user/password incorrect!', 401);
    }
    //Verificando se senhas são iguais.
    const passwordConfirmed = await compare(password, user.password);

    if(!passwordConfirmed){
      throw new AppError('user/password incorrect!', 401);
    } 
    //validação concluída, tudo certo, usuário logado.
    return user;

    
  }
}

export default CreateSessionsService;