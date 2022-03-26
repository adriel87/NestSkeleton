import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class PruebaMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        for (const element in body) {
            if (Object.prototype.hasOwnProperty.call(body, element)) {
                const value = body[element];

                console.log(element,value);
                
                
            }
        
        
        }

        console.log('\nhas visto los valores del body');
        next();
    }
}