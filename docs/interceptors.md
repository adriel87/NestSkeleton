# INTERCEPTORES

implementa una logica antes y despues de manejar una ruta...

es un resumen muy muy sesgado de lo que son los interceptores

## Crear nuestro interceptor de ejemplo

primero un interceptor necesita:
- implementar la interface NestInterceptor
- tambien tiene que tener acceso al ExecutionContext
- un manejador, CallHandler
  - todo esto lo importamos desde @nest/common
- un Observable
- la funcion tap desde Rxjs

un ejemplo del codigo

```typescript

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

Ya tenemos nuestra clase interceptora, lo que va a hacer nuestra clase es ver cuanto tiempo toma realizar nuestro endpoint

vamos a usarlo dentro de nuestro controlador

```typescript
    @Get('intercep')
    @UseInterceptors(new LoggingInterceptor())
    async time(){
        await setTimeout(1000)
        return {
            msg:'probando un interceptor',
            ok:true
        }
    }
```

en este endpoint hemos implementado un retardo de 1 seg y esperamos por el para realizar el return

podemos ver por consola el resultado de el tiempo transcurrido

mas informacion sonre [interceptores](https://docs.nestjs.com/interceptors)
# [👀](https://docs.nestjs.com/interceptors)

holi