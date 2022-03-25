# Proveedores
Los proveedores son un concepto fundamental en Nest. Muchas de las clases básicas de Nest pueden ser tratadas como un proveedor: servicios, repositorios, fábricas, ayudantes, etc. La idea principal de un proveedor es que puede inyectarse como dependencia; esto significa que los objetos pueden crear diversas relaciones entre sí, y la función de "cablear" instancias de objetos puede delegarse en gran medida al sistema de tiempo de ejecución Nest.


## creando nuestro proveedor de usuarios

vamos a crearnos un archivo que nos haga de servicio para el manejo de usuarios

por un lado tenemos un servicio

```typescript
import { Injectable } from "@nestjs/common";
import { User } from "src/interfaces/user.interface";


@Injectable()
export class UserService {

    private readonly users: User[]=[]

    create(user: User){
        this.users.push(user)
    }

    findAll(): User[]{
        return this.users;
    }
}
```

los usuario tambien tiene  una interfase

```typescript
export interface User{
    name: string,
    age: number,
    isHappy: boolean
}
```

ahora vemos como quedaria nuestro controlador

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserService } from 'src/services/users.services';
import { User } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersControllerController {


    constructor(private userService:UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){

        this.userService.create(createUserDto);

    }

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }
}
```

si nos fijamos en el constructor le pasamos como un parametro privado el servicio de usuario, generando una inyeccion de dependencias

mas info sobre este tipo de arquitectura [👀](https://angular.io/guide/dependency-injection)


## Scopes

TODO
[ 👀 ](https://docs.nestjs.com/providers#scopes)

## por ultimo

tenemos que recordar incluir en nuestro app.module.ts los proveedores que hemos creado 

```typescript

@Module({
  imports: [],
  controllers: [AppController,UsersControllerController],
  providers: [AppService,UserService],
})
export class AppModule {}


```