# MIDDLEWARES

Los middleware suelen ser acciones que suceden antes de que una peticion llegue al punto final, vamos que estan en medio.

## Tienen que tener una serie de caracteristicas:
- poder acceder a la request y a la response
- modificar en caso de ser necesario
- acabar con el proceso de la peticion en caso de ser necesario
- llamar al siguiente middleware en caso de que lo haya y pasar el control del proceso , en caso de que no hayan mas middleware se llegara al controlador y se continuara con su manejo.

## usarlos en NEST

hay 2 formas de usar los middlewares en nest como clases o como funciones

### Clases

primero nos creamos nuestro archivo `<nombre>.middleware.ts` podriamos tenerlo en una carpeta dentro de src llamada middleware

vamos a hacer una pequeña prueba, un middleware que se ejecute en las rutas de los usuarios y que nos imprima por consola los elementos que vienen dentro del body que esta dentro del la request de la peticion

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common' 
// las importaciones necesarias desde nest

import { Request, Response, NextFunction } from 'express'
// de la parte de express importamos las interfaces para indicar los tipos de objetos

@Injectable()
export class PruebaMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) { //tipar nos ayuda mucho para saber como esta conformado cada objeto

        const body = req.body; //obtenemos el body de la request

        for (const element in body) { //iteramos sobre el e imprimimos los valores
            if (Object.prototype.hasOwnProperty.call(body, element)) {
                const value = body[element];

                console.log(value);
                
                
            }
        console.log('\nhas visto los valores del body');
        
        }
        next();
    }
}
```

ahora usamos la inyeccion de dependencias en el modulo al que le que queramos aplicar un middleware

para ello nos vamos a app.module.ts aunque ahora veremos como ser mas especificos

```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// exportamos las interfaces/clases de NestModule y la de MiddlewareConsumer

import { PruebaMiddleware } from './middlewares/testMiddleware.middleware';
// tambien nuestro middleware

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) { //usamos la inyeccion de dependencias
    consumer
      .apply(PruebaMiddleware)// aplicamos el/los middleware
      .forRoutes('users');// y las rutas
      // otras formas de indicar las rutas
    //   .forRoutes(UsersController)
    //   .forRoutes({path: 'users', method: RequestMethod.All })
  }
  
}

```

para profundizar un poco mas 
### [👀](https://docs.nestjs.com/middleware#applying-middleware)

### Funciones 

las clases estan bien pero en el caso anterior podemos ver que solo tenemos un metodo que es el que se encarga de todo tener una clase para realizar una sola funcion no parece muy elegante, mejor vamos definir una funcion

creemonos nuestra funcion middleware `<nombre>.middleware.ts`

```typescript
import { Request ,Response, NextFunction } from 'express'

export function pruebaFuncionMiddleware(req: Request, res: Response, next: NextFunction){
    console.log('este midleware es una funcion');
    next();
}
```

ya tenemos la funcion ahora vamos a probarla y para ello volvemos a nuestro archivo app.module.ts

```typescript
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PruebaMiddleware, pruebaFuncionMiddleware)
      .forRoutes('users');
  }
}
```

como vemos podemos usar mas de un middlware separados siempre por comas

u el resultado es el mismo


## Excluir rutas

en muchas ocasiones no vamos a necesitar que todas las rutas de un controlador para ello podemos usar el metodo `exclude()` del objeto consumer

```typescript

consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);

```

con esto conseguimos que esas rutas esten excentas del middleware

## mas de un middleware

por si te has saltado algo de la docu :name_badge:
simplemente tienes que indicar los middlewares separados por comas

asi:

```typescript

consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

```

## middlewares de forma global

por ultimo es posible que necesite algo de forma global, y en este caso es muy parecido  express cuando  usamos middlewares al levantar el servidor

nos vamos al archivo main.ts

```typescript

const app = await NestFactory.create(AppModule);
app.use(logger); //incluyendo el middleware de forma global
await app.listen(3000);

```

