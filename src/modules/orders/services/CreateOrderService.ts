import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
};

interface IRequest {
  customer_id: string;
  products: IProduct[];
};

class CreateOrderService {
  public async execute({customer_id, products}: IRequest): Promise<Order> {    
    
    //Importando os repositórios.
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);
    const ordersRepository = getCustomRepository(OrdersRepository);    
    
    //Encontrando o cliente
    const customerExists = await customersRepository.findById(customer_id);
    if(!customerExists){
      throw new AppError('Could not find any costumer with the given id.');
    }

    //Nesse método, ele só joga na variável "existsProducts" os Id's que foram encontrados.
    const existsProducts = await productsRepository.findAllByIds(products);
    if(!existsProducts.length){
      throw new AppError('Could not find any products with the given ids.');
    }
    const existsProductsIds = existsProducts.map(product => product.id)


    //Pegando os ID's inexistentes:
    const checkInexistentsProducts = products.filter(
      //Pegando cada product.id que não foi adicionado no existsProductsIds e adicionando no checkInexistentsProducts
      product => !existsProductsIds.includes(product.id)
    );

    //if there is something, the variable is not gonna be empty.
    //using .lenght cause it is an array.
    if(checkInexistentsProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentsProducts[0].id}`)
    };

    //Verificando quantidade no estoque:
    const quantityAvailable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
    );

    if(quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for this product!`)
    };

    const serializedProducts = products.map(product =>({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    //Montando o objeto de order
    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });

    const {order_products} = order;
    const updatedProductQuantity = order_products.map(product => ({
      id:product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));

    await productsRepository.save(updatedProductQuantity);
    return order;

  }
}

export default CreateOrderService;