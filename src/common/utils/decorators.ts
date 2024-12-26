import { SetMetadata } from '@nestjs/common';
import { TiposDeUsuario } from '../constants/tipos-usuarios.constants';

export const Public = () => SetMetadata('isPublic', true);


export const TIPOS_DE_USUARIO_KEY = 'tiposDeUsuario';
export const Tipo = (...tiposDeUsuario: TiposDeUsuario[]) => SetMetadata(TIPOS_DE_USUARIO_KEY, tiposDeUsuario);