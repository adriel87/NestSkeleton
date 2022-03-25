import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class ValidationPipe implements PipeTransform<User,string>{
    transform(value: User, metadata: ArgumentMetadata) {
        // console.log(metadata);
        console.log(value.age);
        

        return value.age.toString()+'transformando el numerito'
        
    }
}