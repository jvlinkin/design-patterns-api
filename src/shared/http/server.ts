import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import {errors} from 'celebrate'
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'


const app = express();

//Configs
app.use(cors());
app.use(express.json());

//A variável routes, é a variável que está fazendo o redirect pras respectivas rotas.
app.use(routes);
app.use(errors());

//Middleware - Tratamento de erros na aplicação.
app.use((error: Error, req: Request, res: Response, next: NextFunction) =>{
  if (error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }
  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})


app.listen(3333, () => console.log('Servidor rodando na porta 3333.'));

