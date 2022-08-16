import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

 export default function isAuthenticated(req: Request,res: Response, next: NextFunction): void{

  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new AppError ('JWT is missing.');
  }
  //example token: Bearer kndklasnsnvnfhfiowhdidilkasjd
  const [,token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, auth.jwt.secret)
    return next();
  } catch {
    throw new AppError('Invalid JWT Token');    
  }
 }