import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TIPOS_DE_USUARIO_KEY } from 'src/common/utils/decorators';
import { TiposDeUsuario } from 'src/common/constants/tipos-usuarios.constants';

@Injectable()
export class TiposGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<
            TiposDeUsuario[]
        >(TIPOS_DE_USUARIO_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user?.roles?.includes(role));
    }
}
