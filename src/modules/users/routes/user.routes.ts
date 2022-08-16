import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import UsersController from '../controllers/UserController';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

//ROTA DE LISTAR USUÁRIO
usersRouter.get('/',isAuthenticated, usersController.index);


//ROTA CADASTRO DE USUÁRIO
usersRouter.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  },
}),usersController.create)

export default usersRouter;
