
import { Request, Response } from "express";
import ShowProfileService from "../../../services/ShowProfileService";
import UpdateProfileService from "../../../services/UpdateProfileService";
import UsersRepository from "../../typeorm/repositories/User.Repository";
import {instanceToInstance} from 'class-transformer'

export default class ProfileController {

 
  public async show(req: Request,res: Response): Promise<Response>{
    const showProfile = new ShowProfileService();
    const user_id = req.user.id;
    const user = await showProfile.execute({user_id});
    //Usando a instanceToInstance do class-transformer para não enviar a senha no retorno do objeto.
    return res.json(instanceToInstance(user))
  };
  
  
  public async update(req: Request,res: Response): Promise<Response>{
  
    const usersRepository = new UsersRepository();
    
    //user_id,name,email,password, old_password;
    const user_id = req.user.id;
    const {name,email,password, old_password} = req.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });

    return res.json(instanceToInstance(user));
    
    
  }
}