import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();

//importando a controller
const profileController = new ProfileController();

/*Para aplicar um middleware em todas as rotas podemos podemos aplicar diretamente no router das rotas:
SEMPRE USANDO ANTES DE TODAS AS ROTAS
*/
profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show)

profileRouter.put('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().required().optional(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required()
      })

  },
}),profileController.update)


export default profileRouter;
