import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PruebaMiddleware } from './users/middlewares/testMiddleware.middleware';
import { pruebaFuncionMiddleware } from './users/middlewares/testFunction.middleware';

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PruebaMiddleware, pruebaFuncionMiddleware)
      .forRoutes('users');
  }
  
}
