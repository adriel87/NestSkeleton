import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return false;    // recordemos que aqui tenemos que validar 
                        // lo que nos trae el contexto y validar en
                        // cada caso
    }
}