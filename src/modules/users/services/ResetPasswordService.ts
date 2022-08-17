import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { hash } from "bcryptjs";
import {isAfter, addHours} from 'date-fns'
import UsersRepository from "../typeorm/repositories/User.Repository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";



interface IRequest {
  token: string,
  password: string
};

class ResetPasswordService {
  public async execute({token, password}: IRequest): Promise<void> {    
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if(!userToken){
      throw new AppError('User token does not exists!');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if(!user){
      throw new AppError('User does not exists!')
    }
    
    //Pegamos a data em que o token foi gerado:
    const tokenCreatedAt = userToken.createdAt;

    //Usamos o AddHours passando o limite de expiração do token, nesse caso 2 horas.
    const compareDate = addHours(tokenCreatedAt, 2)

    //Agora comparamos se a data atual é maior que o limite do token. Se true, o token já expirou.
    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired.')
    }

    //Gerando o hash da senha:
    user.password = await hash(password, 8)




    
    

  }
}

export default ResetPasswordService;