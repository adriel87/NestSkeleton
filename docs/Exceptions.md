# Excepciones

Una parte importante de cualquier aplicacion es el manejo de excepciones y Nest no es un Excepcion 😝

por defecto cualquier excepcion generada en nuestros controladores nos devolveran este mensaje

```json
{
    "statusCode": 500,
    "message": "Internal server error"
}
```


## Lanzar nuestras propias excepciones

vamos a partir de un ejemplo creado en este repo dentro del controlador de usuarios

```typescript
    @Get('error')
    async showMeError(){ // forma simple pasandole solo un mesaje y un codigo de error
        throw new HttpException("mira ha pachao algo", HttpStatus.FAILED_DEPENDENCY); // http status es una Enum con los erroes
        
    }

    @Get('errorObject')
    async showMeErrorObject(){ // aqui le pasamos un objeto literal con la informacion que queramos
        throw new HttpException({
           message:"un error con cosas" ,
           number: 344,
           call:"emergency"
        }, HttpStatus.BAD_REQUEST);
        
    }
```

## Custom Exception

Tambien podemos crearnos nuestras propias excepciones, simplemente necesitamos heredar de una de las clase que arroje una excepcion

```typescript

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

```

y luego usarla como usariamos una excepcion normal

```typescript
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

Nest ya nos brinda una serie de excepciones por defecto puesdes mirarlas por aqui [👀](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

## hacer filtros de excepciones

Es posible que queramos ser muy especificos segun que tipo de error surja en nuestra aplicacion, asi que para ello nos podemos contruir una clase que pueda manejar los distintos tipos de excepciones que puedan suceder y nos de informacion al respecto

```typescript

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

```

En el decorador `@Catch(<excepcion>)` indicamos el tipo de excepcion por el cual queremos filtrar, en el caso superior  vemos que va a coger todas las excepciones que tengan cabida dentro de las excepciones http.

### sobre los argumentos

*exception* ➡️ es la excepcion que le vamos a pasar como parametro, vamos el fallo que se ha producido. Siempre que este dentro del rango del filtro

*host* ➡️ como vemos hereda de `ArgumentHost` que nos viene a decir que es un objeto con toda la informacion sobre la peticion

- del host podemos obtener informacion sobre los objetos tipicos que se envian en las peticiones.

### ahora lo usamos

Es bastante simple en este caso hacemos uso de la etiqueta `@UseFilter(new <nuestrofiltro>())`. por ejemplo en un metodo:


#### Scope
##### endpoints
```typescript
  @Get('errorFilter')
    @UseFilters(new HttpExceptionFilter())
    async filterError(){
        // throw new ForbiddenException();
        throw new GoneException();
    }
```

##### controllers
 o bien podriamos  hacerlo mas general aplicando la etiqueta directamente al controlador

```typescript
@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {

    constructor(private userService:UserService){}
    ...
}
```

###### global 

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

###### desde la definicion del modulo

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UserService } from './users.services';
import { HttpExceptionFilter } from '../exceptions/filters/http-exception.filter';

@Module({

    // imports:[],
    // de momento no vamos a usar importaciones de otros modulos
    controllers: [UsersController],
    providers:   [{
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }],
    exports: [UserService]

})
export class UsersModule {}
```

# mas info [ 👀 ](https://docs.nestjs.com/exception-filters)


