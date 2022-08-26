import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import {sign} from 'jsonwebtoken';
import auth from "@config/auth";
import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/User.Repository";



interface IRequest {
  email: string,
  password: string
};

interface IReponse {
  user: User,
  token: string
}

class CreateSessionsService {
  public async execute({email, password}: IRequest): Promise<IReponse> {

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
    //configuração jsonwebtoken
    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn
    });

    return {
      user,
      token
    };

    
  }
}

export default CreateSessionsService;