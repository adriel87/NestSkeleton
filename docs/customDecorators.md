# Decorardores personalizados

como hemnos visto en el resto de  los basicos de de nest, practicamente todo lo que hacemos tenemos decoradores `@cositas()`

podemos crearnos nuestros decoradores para hacer mas facil y legible nuestro codigo

por ejemplo creandonos un decorados que mire dentro de los parametros que se envian con al peticion si existe un usuario para lo cual hacemos lo siguiente

```typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserDecorator = createParamDecorator(
    (data: string, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest();


        const user = request.body.user;


        return data ? user?.[data] : user;
    }
)
```

como vemos en los decoradores tambien accedemos al objeto ExecutionContext que es donde nos viene toda la informacion de la peticion.

la variable data es la que nos va a indicar en caso de que se pase por parametro al decorador el parametro que queramos acceder



## ahora a usarlo


ahora vamos a nuestro controlador para usar el decorador

```typescript
 @Get('decorator')
    async decorator(@UserDecorator('name') name :string){

        console.log(name);
        
    }
```

