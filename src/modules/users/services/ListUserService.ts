import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/User.Repository";


class ListUserService {
  public async execute(): Promise<User[]> {
    
    //Importando o repositório.
    const usersRepository = getCustomRepository(UsersRepository);
    
    const users = await usersRepository.find();
    return users;

  }
}

export default ListUserService;