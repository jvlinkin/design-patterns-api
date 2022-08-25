import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '@config/cache'; 

export default class RedisCache{
  private client: RedisClient;

  constructor(){
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async save(key:string, value: any): Promise<void>{
    //Método SET é do Redis, para realizar uma ação no BD.
    await this.client.set(key, JSON.stringify(value));
  }

  //Como no momento que fazemos o recover (lá no serviço que usa o cache do Redis), e não sabemos os dados que serão retornados, criamos aqui o método recover com o parâmetro<T>, que seria um tipo genérico.
  public async recover<T>(key:string): Promise<T | null>{
    //Método GET é do Redis, para buscar no BD.
    const data = await this.client.get(key);
    
    if(!data){
      return null
    }

    //Nesse momento, quando os dados já estão no Redis, salvos como string (configuração do método save), precisamos converter para o tipo que foi passado no momento de executar o método recover:
    const parsedData = JSON.parse(data) as T;
    return parsedData;

  }

  public async invalidate(key:string): Promise<void>{
    await this.client.get(key);
  }
}