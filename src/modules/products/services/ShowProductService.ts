//Como iremos importar um repositório customizado, precisamos importar:
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

//Como iremos pesquisar por um "id", precisamos criar uma interface para tipar o dado na request:
interface IRequest {
  id: string
}

class ShowProductService{
  //método (já desestruturando o dado vindo na request)
  public async execute({id}: IRequest): Promise<Product | undefined>{
    //importar o repositório
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id)

    if(!product){
      throw new AppError('Product not found!.')
    }

    return product;

     
  }

}

export default ShowProductService;