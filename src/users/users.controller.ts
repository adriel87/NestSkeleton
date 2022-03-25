import { Body, Controller, Get, GoneException, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseFilters } from '@nestjs/common';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './users.services';
import { HttpExceptionFilter } from '../exceptions/filters/http-exception.filter';

@Controller('users')
export class UsersController {

    constructor(private userService:UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){

        this.userService.create(createUserDto);

    }

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('error')
    async showMeError(){
        throw new HttpException("mira ha pachao algo", HttpStatus.FAILED_DEPENDENCY);
        
    }

    @Get('errorObject')
    async showMeErrorObject(){
        throw new HttpException({
           message:"un error con cosas" ,
           number: 344,
           call:"emergency"
        }, HttpStatus.BAD_REQUEST);
        
    }

    @Get('errorCustom')
    async customError(){
        throw new ForbiddenException()
    }

    @Get('errorFilter')
    @UseFilters(new HttpExceptionFilter())
    async filterError(){
        // throw new ForbiddenException();
        throw new GoneException();
    }

    @Get('pipes/:id')
    async simplePipe(@Param('id', ParseIntPipe) id:number){
        console.log('pipes here');

        return this.userService.findOne(id)

    }


}
