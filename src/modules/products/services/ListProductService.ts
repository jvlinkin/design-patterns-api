import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"
import RedisCache from "@shared/cache/RedisCache";


class ListProductService {
  public async execute(): Promise<Product[]> {
    
    //Importando o repositório.
    const productsRepository = getCustomRepository(ProductRepository);
    //Instanciando o Redis:
    const redisCache = new RedisCache();

    //Tentando recuperar os dados no Cache, passando a chave como parêmetro:
    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT-LIST');

    if(!products){//Se não for encontrado nada, então ele busca no Postgres, 
      products = await productsRepository.find();
      //e salva no cache do Redis.
      await redisCache.save('api-vendas-PRODUCT-LIST',products)
    }
  
    return products;

  }
}

export default ListProductService;