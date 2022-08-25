//Como iremos importar um repositório customizado, precisamos importar:
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Como iremos pesquisar por um "id", precisamos criar uma interface para tipar o dado na request:
interface IRequest {
  id: string,
  name: string,
  price: number,
  quantity: number
};

class UpdateProductService{
  //método (já desestruturando o dado vindo na request)
  public async execute({id, name, price, quantity}: IRequest): Promise<Product>{
    
    //importar o repositório
    const productsRepository = getCustomRepository(ProductRepository);

    //Validações
    const product = await productsRepository.findOne(id)
    if(!product){
      throw new AppError('Product not found!.')
    }

    const productExists = await productsRepository.findByName(name)
    if(productExists && name !== product.name){
      throw new AppError('There is already a product with this name!')
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT-LIST');
    

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    

    await productsRepository.save(product);
    
    return product;

     
  }

}

export default UpdateProductService;