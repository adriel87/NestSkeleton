import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.services';

@Module({

    // imports:[],
    // de momento no vamos a usar importaciones de otros modulos
    controllers: [UsersController],
    providers:   [UserService],
    exports: [UserService]

})
export class UsersModule {}
