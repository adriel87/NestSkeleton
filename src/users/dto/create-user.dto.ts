import { IsBoolean, IsInt, IsString } from "class-validator";


export class CreateUserDto{
    @IsString()
    name:string;

    @IsInt()
    age:number;

    @IsBoolean()
    isHappy:boolean;
}