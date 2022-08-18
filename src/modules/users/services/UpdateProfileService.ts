import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { compare, hash } from "bcryptjs";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/User.Repository";

interface IRequest{
  user_id: string
  name: string,
  email: string,
  password?: string
  old_password?: string
}

class UpdateProfileService {
  public async execute({user_id,name,email,password, old_password}: IRequest): Promise<User> {
    
    //Instanciando o nosso repositório;
    const usersRepository = getCustomRepository(UsersRepository);
    
    const user = await usersRepository.findById(user_id);    
    if(!user){
      throw new AppError('User not found.', 404)
    };

    const userUpdateEmail = await usersRepository.findByEmail(email);
    if(!userUpdateEmail){
      throw new AppError('Email not found.')
    };
    //Validando de que o e-mail enviado no corpo da requisição, pertence ao ID de quem fez a requisição.
    if(userUpdateEmail && userUpdateEmail.id != user.id){
      throw new AppError('There is already one user with this email.')
    }

    //Validando se o usuário enviou o old_password
    if(password && !old_password){
      throw new AppError('Old password is required!')
    };

    //Validando no banco de dados se a old_password é realmente a antiga
    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password)

      if(checkOldPassword === false){
        throw new AppError('Password incorrect')
      }

      //Inserindo senha com o HASH do BCRYPT;
      user.password = await hash(password, 8);

    }

    //Alterando name
    user.name = name;
    //Alterando email
    user.email = email;

    await usersRepository.save(user)


    
    return user;

  }
}

export default UpdateProfileService;