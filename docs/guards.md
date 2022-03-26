# Guards 

## Que es un Guard ??

pues si traducimos la palabra guard, podriamos decir que es tu guardia aunque mas bien seria la forma en la que te proteges.

En nest los Guard sirven para proteger las rutas en base a una serie de condiciones como : *permisos, roles, ...*

como normal general la Autenticacion es manejada por un middleware, si bien un middleware es capaz de manejar este tipo de problemas, sin embargo un middleware desconoce por definincion cual es el manjedor asociado a su ruta.

por otro lado los Guards tienen acceso al un contexto de ejecucion ***ExecutionContext***, basicamente es que conoce exactamente que es lo que se va a ejecutar a continuacion.

*Tip* se ejecutan antes que los middlewares y despues de los interceptors o [Pipes](pipes.md)

## Guard de autorizacion

Con AuthGuard  nosotros vamos a extraer un token de las cabeceras,entendemos con esto que enviamos en token por las mismas, el Guard obervara ese token y en base a esto nos devolvera una respuesta.

### creando nuestro primer guard

primero vamos a crearnos una clase que se encargue de hacer guardia

```typescript
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { validateRequest } from './validate';

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const request = context.switchToHttp().getRequest();
       return validateRequest(request)
    }
}
```

1. como vemos implementamos CanActive que una interfaz que nos obliga a devolver un valor booleano, si el metodo que devuelve es true continua con la ejecuacion del controlador, en caso contrario detiene la ejecucion

2. tambien podemos observar que delegamos la accion a un metodo o clase que sera la encargada de determinar que hacer con lo que sea que le pasemos

### Que es el [Execution context](https://docs.nestjs.com/fundamentals/execution-context)

resumiendolo mucho es un un contexto que hace referencia a varias cosas, entre ellas el request de la peticion, aunque tambien podriamos observar la respuesta o la siguiente funcion

### defiendo un Guard para los roles

vamos a repetir el guard anterior pero en este caso vamos a definir que roles son los que pueden acceder a cada ruta

