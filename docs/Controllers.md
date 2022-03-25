# Controladores

los controladores lo vamos a usar para manejar las peticiones y respuestas

un controlador esta vinculado a una ruta

luego cada metodo que queramos usar estara asociado a un metodo http, con Nest usaremos *decoradores*

## Routing

para indicar una ruta, o endpoint tenemos que indicarlo en el decorador del controller y de su metodo

por ejemplo la ruta de usuarios que muestra sus post
***localhost/user/post***

```typescript

import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('post')
  findAll(): postObject {
    return getPosts();
  }
}

```
como vemos tenemos la urata formada entre el decorador @Controller y @Get

- el primer decorador es logicamente para indicar la ruta de partida del controlador
- el segundo nos indica el tipo de metodo http que sera usado

## Request object

esto es lo que nos envian desde fuera, los datos que nos llegan en la paticion de diversas formas, ya sean parametros o datos atraves del body

  ```typescript
  @Get('example/:hola')
  showReqInfo(@Req() request: Request, @Body() body: Body): string{

    
    console.log(body);
    
    

    return request.params.hola;
  }
  ```
  como vemos dentro de el metodo usamos la etiqueta @Req, esta nos da acceso al objeto request luego lo tipamos como un tipo de objeto Request de express, que nos dara acceso a una serie de metodos de la clase ademas de evitar posibles fallos en nuestro codigo gracias a la ayuda que nos brinda el ide
  tambien tenemos la etiqueta @Body que con ella podemos ir directamente al objeto dentro de request.params.body
  usualmente se envian por aqui los datos de los formularios.

  ## Resources

  basicamente los metodos Http, nest soporta atraves de los decoradores recien sacado de la caja 
  
  @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options() y @Head()

  con los 4 primeros tenemos un CRUD

  ademas tenemos la etiqueta @All() para manejar cualquier tipo de peticion.

  ## rutas salvajes

  cuando vamos a definir una ruta es posible que no necesitemos la ruta exacta del endpoint.

  para ello dentro de la etiqueta podemos indicar con un asterisco en la ruta donde se vuelve 'salvaje' xD

  @Get('ab*cd')

  ```typescript
    @Get('pr*ba')
  wildMessage():string{
    return 'mensaje de prueba de una ruta salvaje'
  }
  
  @Get('/*')
  ```

  ## especificar Headers

  usaremos el decorador @Header()
  ```typescript

    @Post()
    @Header('Cache-Control', 'none')
    create() {
        return 'This action adds a new cat';
    }

  ```

  ## redirecciones

  en este caso usamos el decorador @Redirect()
  este nos pide una ruta y un statusCode

```typescript
@Get('redirect')
  @Redirect('http://localhost:3000/users/adasd', 301)
  none():void{}
```

## parametro en las rutas

para rutas dinamicas qeu reciban por la url diferentes parametros
@Params y lo usaremos dentro del metodo

```typescript
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} user`;
}
```

## routas de subdominio, scope y asincronia

[pa la docu](https://docs.nestjs.com/controllers#sub-domain-routing)

## request payload

Como buena practica podemos indicar que tipo de datos son los que necesitamos para hacer distintas acciones, tomemeos como base la creacion de un usario.

```typescript

//aqui tenemos nuestro DTO para crear nuestro nuevo usuario
export class CreateUserDto{
    name:string;
    age:number;
    isHappy:boolean;
}

// ahora en nuestro controlador podemos hace un metodo post y que en el body espere un objeto del tipo CreateUserDto

@Post('create')
create(@Body() createUserUser:CreateUserDto):string{

  const {name,age,isHappy} = createUserUser;
  const estado = isHappy ? 'feliz' : 'de camino a ser feliz'

  return `El usuario ${name} tiene ${age} y el esta ${estado}`
}

```

## manejando errores

TODO, meanwhile ⬇️

[go Doc](https://docs.nestjs.com/exception-filters)


### tips

podemos cambiar el codigo de status de la respuesta mediante el decorador @HttpCode(statusCode)