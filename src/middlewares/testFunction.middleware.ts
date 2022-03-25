import { Request ,Response, NextFunction } from 'express'

export function pruebaFuncionMiddleware(req: Request, res: Response, next: NextFunction){
    console.log('este midleware es una funcion');
    next();
}