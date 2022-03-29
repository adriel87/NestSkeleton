import { Body, Controller, Get, GoneException, HttpException, HttpStatus, Param, ParseIntPipe, Post, SetMetadata, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './users.services';

import { ValidationPipe } from './pipes/validation.pipe';
import { ClassValidation } from './pipes/classValidation.pipe';
import { HttpExceptionFilter } from './exceptions/filters/http-exception.filter';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { setTimeout } from 'timers/promises';
import { LoggingInterceptor } from './interceptors/logging.interceptor';



@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {

    constructor(private userService:UserService){}

    @Post()
    @Roles('admin')
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
    // @UseGuards(RolesGuard)
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
        return this.userService.findOne(id)
    }

    @Get('pipes/custom/:id')
    async customPipe(@Body(new ValidationPipe()) age:string){
        return age;
    }

    @Get('intercep')
    @Roles('admin')
    @UseInterceptors(new LoggingInterceptor())
    async time(){
        await setTimeout(1000)
        return {
            msg:'probando un interceptor',
            ok:true
        }
    }


    
// TODO intentar sacar la validacion por esquemas de Joi
    // @Post('pipes')
    // @UsePipes(new SchemaValidation(Joi.object()))
    // async createWhitPipe(@Body() createUserDto: CreateUserDto){
    //     this.userService.create(createUserDto)
    // }

    @Post('pipes/class')
    async createWhitClassValidation(
        @Body(new ClassValidation()) createUserDto: CreateUserDto)
        {
            this.userService.create(createUserDto)
        }

}
