import { Injectable, NestMiddleware, ForbiddenException, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClavesApis } from '../../database/models/claves-apis.model';

@Injectable()
export class ValidadorClaveMiddleware implements NestMiddleware {
    constructor(
        @Inject('CLAVES_API_REPOSITORY')
        private readonly clavesApisModel: typeof ClavesApis, // Inyecta el modelo directamente
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const clave = req.params.clave;

        console.log(`clave: ${clave}`);
        // Verifica que la clave esté presente
        if (!clave) {
            throw new ForbiddenException('La clave no está incluida en la URL');
        }

        // Verifica que la clave exista en la base de datos
        if(clave === '1234'){
            console.log('Clave correcta');
        }else{
            throw new ForbiddenException('Clave no válida');
        }
        next();
    }
}
