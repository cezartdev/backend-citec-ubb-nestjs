import {
    Injectable,
    NotFoundException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';
import { Usuarios } from 'src/database/models/usuarios.model';
import {
    CrearUsuariosDto,
    ActualizarUsuariosDto,
    ObtenerPorIdUsuariosDto,
    EliminarUsuariosDto,
    IniciarSesionDto,
} from '../dtos/usuarios.dto';
import { BaseServices } from '../../common/base/base-services.class';
import { ESTADOS } from 'src/common/constants/estados.constants';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService extends BaseServices {
    async crear(usuario: CrearUsuariosDto): Promise<Usuarios> {
        /**
         * Validaciones
         * - Usuario ya existe
         * -
         */
        const existeUsuario = await Usuarios.findOne({
            where: { email: usuario.email },
        });
        if (existeUsuario) {
            throw new ConflictException('Ya existe un usuario con ese email');
        }

        const usuarioCreado = await Usuarios.create({
            ...usuario,
        });

        return usuarioCreado;
    }

    async obtenerTodos(): Promise<Usuarios[]> {
        const usuarios = await Usuarios.findAll({
            where: { estado: ESTADOS.OPCION_1 },
        });
        return usuarios;
    }

    async obtenerPorId(
        clavePrimaria: ObtenerPorIdUsuariosDto,
    ): Promise<Usuarios> {
        const usuario = await Usuarios.findByPk(clavePrimaria.email);

        if (!usuario) {
            throw new NotFoundException(
                `Usuario con email ${clavePrimaria.email} no encontrado`,
            );
        }

        return usuario;
    }

    async obtenerTodosEliminados(): Promise<Usuarios[]> {
        const usuarios = await Usuarios.findAll({
            where: { estado: ESTADOS.OPCION_2 },
        });
        return usuarios;
    }

    async actualizar(usuario: ActualizarUsuariosDto): Promise<Usuarios> {
        const usuarioExistente = await Usuarios.findByPk(usuario.email);

        if (!usuarioExistente) {
            throw new NotFoundException(
                `Usuario con email ${usuario.email} no encontrado`,
            );
        }

        return usuarioExistente;
    }

    async eliminar(clavePrimaria: EliminarUsuariosDto): Promise<Usuarios> {
        const usuario = await Usuarios.findByPk(clavePrimaria.email);

        if (!usuario) {
            throw new NotFoundException(
                `No existe un usuario con el email ${clavePrimaria.email}`,
            );
        }

        const filasAfectadas = await Usuarios.update(
            { estado: ESTADOS.OPCION_2 },
            { where: { email: clavePrimaria.email } },
        );

        const usuarioEliminado = await Usuarios.findByPk(clavePrimaria.email);

        return usuarioEliminado;
    }

    async iniciarSesion(datos: IniciarSesionDto): Promise<Usuarios> {
        const usuario = await Usuarios.findOne({
            where: { email: datos.email},
        });

        //Si el usuario no existe
        if (!usuario){
            throw new ForbiddenException('Credenciales invalidas');
        }

        const contraseñaEncriptada = usuario.contraseña;

        //Comparar contraseñas
        const contraseñaValida = await bcrypt.compare(datos.contraseña, contraseñaEncriptada);

        if (!contraseñaValida){
            throw new ForbiddenException('Credenciales invalidas');
        }

        return usuario;
    }
}
