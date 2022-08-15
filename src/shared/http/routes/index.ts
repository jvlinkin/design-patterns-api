import productsRouter from "@modules/products/routes/products.routes";
import usersRoutes from "@modules/users/routes/user.routes";
import { Router, Request, Response } from "express";

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);

routes.get('/', (req, res)=>{
  return res.json({message: "Hello Dev!"});

})

export default routes;