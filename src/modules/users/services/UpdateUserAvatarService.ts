import AppError from "@shared/errors/AppError";
import path from "path";
import fs from 'fs';
import { getCustomRepository } from "typeorm"
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/User.Repository";
import uploadConfig from '@config/upload';



interface IRequest {
  user_id: string,
  avatarFilename: string
};

class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: IRequest): Promise<User> {    
    
    //Importando o repositório.
    const usersRepository = getCustomRepository(UsersRepository);

    //Verificando se usuário existe.
    const user = await usersRepository.findById(user_id)

    if(!user){
      throw new AppError('User not found!')
    }

    //Verificando se usuário já tem avatar.
    if (user.avatar){
      //Pegando o caminho de onde é salvo os arquivos + o nome do arquivo que está armazenado.
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      //Validando se realmente o arquivo existe.
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      //Remover o arquivo
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
      
    }

    //Depois de valiadar, passamos pro avatar o arquivo que o usuário enviou.
    user.avatar = avatarFilename;
    await usersRepository.save(user)

    return user;

  }
}

export default UpdateUserAvatarService;