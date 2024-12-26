import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Tipos } from '../../models/tipos.model';
import { Usuarios } from '../../models/usuarios.model';
import { TIPOS_DE_USUARIO } from 'src/common/constants/tipos-usuarios.constants';
import { ESTADOS } from 'src/common/constants/estados.constants';
import * as bcrypt from 'bcrypt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class SeederService {
    constructor(
        private readonly sequelize: Sequelize,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    async run() {
        /**
         * Tipos de Usuario
         */
        const tiposDeUsuario = Object.values(TIPOS_DE_USUARIO);
        for (const tipo of tiposDeUsuario) {
            await Tipos.findOrCreate({
                where: { nombre: tipo },
                defaults: { nombre: tipo },
            });
        }
        /**
         * Usuario de Desarrollo
         */
        const contraseñaEncriptada = await bcrypt.hash(this.configService.desarrollador.contraseña,10)

        await Usuarios.findOrCreate({
            where: {
                email: 'desarrollo@gmail.com',
            },
            defaults: {
                email: 'desarrollo@gmail.com',
                nombre: 'Desarrollo',
                apellido: 'Desarrollo',
                contraseña: contraseñaEncriptada,
                estado: ESTADOS.OPCION_1,
                nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
            },
        });


        
    }
}
