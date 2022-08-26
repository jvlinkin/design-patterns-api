import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import SessionsControlller from "../controllers/SessionsController";


const sessionsRouter = Router();
const sessionsController = new SessionsControlller();

sessionsRouter.post('/', celebrate({
  [Segments.BODY]:{
    email: Joi.string().email().required(),
    password: Joi.string().required()
  },
}),


sessionsController.create)

export default sessionsRouter;
