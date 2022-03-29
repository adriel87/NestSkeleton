import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // return false;    // recordemos que aqui tenemos que validar 
                        // lo que nos trae el contexto y validar en
                        // cada caso

        
                        

         const roles = this.reflector.get<string[]>('roles', context.getHandler());

         

        if(!roles){
            return true
        }

        const request = context.switchToHttp().getRequest().body;
        const user = request.user;
        return this.matchRoles(roles, user.rol)
    }

    matchRoles = (roles , userRole) :boolean=>{

        return roles.includes(userRole)
    }    
}

