# Pipes

Para transformar o validar los datos que nos llegan o enviamos por las peticiones podemos usar los Pipes que nos proporciona Nest


estas *"tuberias"* van a procesarse justo antes del metodo en el controlador.

hay una serie de pipes predefinidos

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe

## usando Pipes

primero vamos  definir un endpoint para usar una
tuberia

```typescript
@Get('pipes/:id')
    async simplePipe(@Param('id', ParseIntPipe) id:number){
        console.log('pipes here');

        return this.userService.findOne(id)

    }
```

ahora podemos probar nuestro endpoint probemos pasandole un numero dentro del rango de ids de usuarios `localhost:3000/users/pipes/1` nos devolvera ese usuario

```json
{
    "name": "asdasd",
    "age": 35,
    "isHappy": true,
}
```

ahora vamos a lanzar la misma peticion pero cambiando el parametro `localhost:3000/users/pipes/asd`

```json
{
    "statusCode": 400,
    "message": "Validation failed (numeric string is expected)",
    "error": "Bad Request"
}
```

## creando nuestros custom pipes

Primero nos crearemos nuestra clase que extienda de PipeTransform

para luego implementarla

```typescript
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform<number,string>{
    transform(value: number, metadata: ArgumentMetadata) {
        console.log(metadata); // log para ver que hay dentro de la metadata

        return value.toString()+'transformando el numerito'
        
    }
}
```

como vemos la clase implenta la interfaz `PipeTransform` es una interfzas generica, si no le indicamos los tipos trabajara como si fuera argumentos de tipo *any* sin embargo podemos indicarle el valor del valor ***value***, de entrada y el retorno, por ejemplo recibimos un string y queremos devolver un nomero

```typescript
export class ValidationPipe implements PipeTransform<string,number>{
    transform(value: string, metadata: ArgumentMetadata) {
        ...
        ...
        return un valor numerico;
        
    }
}
```

para mas info [👀](https://docs.nestjs.com/pipes#custom-pipes)

### valiando clases o tipos de objetos

Es normal que por el  cuerpo de una peticion nos lleguen datos, digamos desordenados. Podriamos hacer mas potente nuestros pipes para la validacion o transformacion de estos argumentos, que comprueben si lo que se esta enviando es por ejemplo un objeto del tipo User

hay varias foras de hacer esto veamos un par de ellas

### Object Schema Validation

para hacer esta validacion nos ayudaremos de una libreria que nos facilitara el trabajo [`joi`](https://joi.dev/api/?v=17.6.0)

```shell
$ npm i --save joi
$ npm i --save-dev @types/joi

```

ahora vemos a crearnos una clase que nos valide si el esquema del objeto que vamos a usar es el correcto en por ejemplo una peticion post


# under construtc
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class SchemaValidation implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
```

### Class validation

Tambien podemos validar las clases 
para ello debemos realizar la siguiente instalcion
```shell
$ npm i --save class-validator class-transformer
```

ahora en nuestro dto de user, vamos indicar mediante etiquetas como es cada tipo de dato

```typescript
export class ClassValidation implements PipeTransform<any>{
    async transform(value: any, { metatype }: ArgumentMetadata) {
        
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object)

        if ( errors.length > 0 ){
            throw new BadRequestException('validation failed')
        }

        return value;
    }


    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
```

## [ 👀 ](https://docs.nestjs.com/pipes#class-validator)


### Scope

recordemos  que para tener un alcance global podemos cargar estos pipes en nuestro archivo main.ts

`app.useGlobalPipes(new <tupipeAqui>)`

### inyectarlos en modulos

o podemos indicar que pipe usa cada modulo en general de esta forma

```typescript

import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

```

## tranformaciones

igual que podemos validar los datos desde el cliente, igual en alguna ocasion vamos a necesitar transformalos de alguna manera
por ejemplo pasar de un entero a una cadena o viceseversa

```typescript

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

```

luego lo podemos usar como cualquier pipe, en nuestro controlador

```typescript

@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return this.catsService.findOne(id);
}

```

para ver mas sobre los pipes

# [ 👀 ](https://docs.nestjs.com/pipes)

