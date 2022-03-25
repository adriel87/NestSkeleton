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