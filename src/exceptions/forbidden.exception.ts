import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException{
    constructor(){
        super('Por aqui no', HttpStatus.FORBIDDEN)
    }
}