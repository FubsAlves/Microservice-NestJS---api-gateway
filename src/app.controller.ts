import { Body, Controller, Get, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


@Controller('api/v1')
export class AppController {
  
  private logger = new Logger(AppController.name);
  
  private clientAdminBackend: ClientProxy
  
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [''], // Inserir URL de conexão com RabbitMQ
        queue: 'admin-backend'
      }
    })
  }  

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body()  criarCategoriaDto: CriarCategoriaDto) {
        return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
    }
    
}
