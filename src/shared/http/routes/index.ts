import productsRouter from "@modules/products/routes/products.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRoutes from "@modules/users/routes/user.routes";
import { Router, Request, Response } from "express";

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter)

routes.get('/', (req: Request, res: Response)=>{
  return res.json({message: "Hello Dev!"});

})

export default routes;