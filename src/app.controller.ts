// ver docs/Controllers

import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';

interface cosita{
  nombre:string,
  edad:number,
  felicidad:boolean
}

let nuevaCosita : cosita = {
  edad:3,
  felicidad:true,
  nombre:'adri'
}

const redirectOptions= {
  url:'http://localhost:3000/users/adasd',
  statusCode:305
}

@Controller('prueba')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('id')
  // @HttpCode(300)
  // getHello(): string {
  //   return this.appService.getHello();
  // }


  @Get('example/:hola')
  showReqInfo(@Req() request: Request, @Body() body: Body): string{

    
    console.log(body);
    
    

    return request.params.hola;
  }


  @Get('pr*ba')
  wildMessage():string{
    return 'mensaje de prueba de una ruta salvaje'
  }

  @Get('redirect')
  @Redirect('http://localhost:3000/users/adasd', 301)
  none():void{}
  

  @Get(':id')
  findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} user`;
}

@Post('create')
create(@Body() createUserUser:CreateUserDto):string{

  const {name,age,isHappy} = createUserUser;
  const estado = isHappy ? 'feliz' : 'de camino a ser feliz'

  return `El usuario ${name} tiene ${age} y el esta ${estado}`
}

  @Get('/*')
  getSomething(): cosita{
    return nuevaCosita
  }

  


}
