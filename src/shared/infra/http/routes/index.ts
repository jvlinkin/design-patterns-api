import productsRouter from "@modules/products/infra/http/routes/products.routes";
import passwordRouter from "@modules/users/infra/http/routes/password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRoutes from "@modules/users/infra/http/routes/user.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes"
import customersRouter from "@modules/customers/infra/http/routes/customers.routes";
import { Router, Request, Response } from "express";
import ordersRouter from "@modules/orders/infra/http/routes/orders.routes";

const routes = Router();
//Rota púbica (teste)
routes.get('/', (req: Request, res: Response)=>{
  return res.json({message: "Hello Dev!"});

})

//Rotas
routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)



export default routes;