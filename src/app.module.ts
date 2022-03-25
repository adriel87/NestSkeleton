import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PruebaMiddleware } from './middlewares/testMiddleware.middleware';
import { pruebaFuncionMiddleware } from './middlewares/testFunction.middleware';

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
