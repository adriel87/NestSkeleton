# Modules

Los modulos son una forma de segmentar soluciones determinadas, tomemos de ejemplo a los usuarios, en este esqueleto tenemos un proveedor que es el controlador y un servicio que el que tiene la logica para trabajar con los usuarios

pues todo esto lo podriamos juntar o empaquetar en un modulo.


## como convertirlo en un modulo

lo primero de todo es que tenemos que crearnos nuestro archivo para seguir usando el  mismo standar `<nombre>.<tipo>.ts`, dentro de la carpeta user por ejemplo:
***user.module.ts***

```typescript
import { Module } from '@nestjs/common';

@Module({}) // como vemos hacemos uso de la etiqueta module para indicarle a nest lo que es
export class UsersModule {}

```

## que conforma el modulo

pues si nos fijamos en el archivo de app.module generado al crear la app con nest.

```typescript
@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}
```

tenemos la misma estructura y dentro del objeto que se le pasa como parametro tenemos:
- imports: aqui importamos otros modulos
- controller: los controlladores que formaran parte del modulo
- providers: los servicios que formaran parte  del modulo

vale pues vamos a crear el modulo de usuarios

## creando el modulo de usuarios

lo primero vamos a replicar el objeto que vimos anteriormente en nuestro modulo de usuarios

```typescript
import { Module } from '@nestjs/common';

@Module({

    // imports:[],
    // de momento no vamos a usar importaciones de otros modulos
    controllers:[UsersController],
    providers:[UserService]

})
export class UsersModule {}

```

una vez hecho esto ya tenemos nuestro primer modulo listo, ahora vamos a usarlo. 

## Usando Modulos

ahora abrimos el app.module.ts y lo modificamos para que quede de la siguiente forma

```typescript
@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

como vemos eliminamos los controladores y los proveedores, ademas de haber eliminado las importaciones que ahora se hacen en el modulo de usuarios

## comportamiento de los modulos

por defecto nest trata los modulos como singletons, asi el modulo se instancia y si se necesita algo del mismo desde diferentes puntos de la aplicacion nos aseguramos de que siempre apuntemos al mismo objeto/modulo

una vez creado el  modulo es facilmente reutilizable.

supongamos que solo queremos exportar una parte del modulo, para ello solo tenemos que indicarlo en el mismo de la siguiente forma

```typescript
@Module({

    // imports:[],
    // de momento no vamos a usar importaciones de otros modulos
    controllers: [UsersController],
    providers:   [UserService],
    exports: [UserSevice] // incluyendo la propiedad export en indicandole que es lo que queremos exportar

})

export class UsersModule {}
```

no solo podemos exportar nuestro modulo de esta forma tambien podemos exportarlo desde otros modulos en caso de ser necesario por ejemplo:

```typescript

@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}

```

## inyeccion de dependencias

tambien podemos usar inyeccion de dependencias desde nuestro modulo, asi que cuando levantemos una instancia del mismo generar esas dependencias

```typescript

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}

```

como vemos en el contructor del modulo realizamos la inyeccion pasandole la interfaz de por parametro

## modulos globales 

imaginemos que necesitamos un modulo de forma global a la aplicacion pero lo que conocemos hasta el momento es que vamos a tener que realizar  importaciones con el mismo codigo en distintas partes de nuestro proyecto, para evitar esto usaremos la etiqueta `@global`

solo tendremos que incluir la etiqueta en nuestro modulo de la siguiente forma

```typescript
.
.
.
@Global() // aqui indicamos que el  modulo sera accesible de manera global
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

## modulos dinamicos

TODO

[ 👀 ](https://docs.nestjs.com/modules#dynamic-modules)



