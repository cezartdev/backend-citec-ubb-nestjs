import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class EncriptarContraseñaMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.contraseña) {
            const salt = await bcrypt.genSalt(10); // Genera un salt
            req.body.contraseña = await bcrypt.hash(req.body.contraseña, salt); // Encripta la contraseña
        }
        next(); // Continúa con la siguiente etapa del procesamiento
    }
}
