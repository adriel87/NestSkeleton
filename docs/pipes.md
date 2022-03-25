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