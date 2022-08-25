//Como iremos importar um repositório customizado, precisamos importar:
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Como iremos pesquisar por um "id", precisamos criar uma interface para tipar o dado na request:
interface IRequest {
  id: string
}

class DeleteProductService{
  //método (já desestruturando o dado vindo na request)
  public async execute({id}: IRequest): Promise<void>{
    //importar o repositório
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id)

    if(!product){
      throw new AppError('Product not found!.')
    }
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT-LIST');

    await productsRepository.remove(product);

     
  }

}

export default DeleteProductService;