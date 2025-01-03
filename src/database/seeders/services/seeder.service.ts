import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../../../config';
import { UsuariosSeeder } from '../seed/usuarios.seeders';
import { TiposSeeder } from '../seed/tipos.seeders';
import { RegionesSeeder } from '../seed/regiones.seeders';

@Injectable()
export class SeederService {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        private readonly tiposSeeder: TiposSeeder,
        private readonly usuariosSeeder: UsuariosSeeder,
        private readonly regionesSeeder: RegionesSeeder,
    ) {}

    async run() {
        // /**
        //  * Tipos de Usuario
        //  */
        // const tiposDeUsuario = Object.values(TIPOS_DE_USUARIO);
        // for (const tipo of tiposDeUsuario) {
        //     await Tipos.findOrCreate({
        //         where: { nombre: tipo },
        //         defaults: { nombre: tipo },
        //     });
        // }
        // /**
        //  * Usuario de Desarrollo
        //  */
        // const contraseñaEncriptada = await bcrypt.hash(
        //     this.configService.desarrollador.contraseña,
        //     10,
        // );

        // await Usuarios.findOrCreate({
        //     where: {
        //         email: 'desarrollo@gmail.com',
        //     },
        //     defaults: {
        //         email: 'desarrollo@gmail.com',
        //         nombre: 'Desarrollo',
        //         apellido: 'Desarrollo',
        //         contraseña: contraseñaEncriptada,
        //         estado: ESTADOS.OPCION_1,
        //         nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
        //     },
        // });

        // const contraseñaEncriptadaTest = await bcrypt.hash('1234', 10);
        // await Usuarios.findOrCreate({
        //     where: {
        //         email: 'test@gmail.com',
        //     },
        //     defaults: {
        //         email: 'test@gmail.com',
        //         nombre: 'Test',
        //         apellido: 'Test',
        //         contraseña: contraseñaEncriptadaTest,
        //         estado: ESTADOS.OPCION_1,
        //         nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
        //     },
        // });

        await this.tiposSeeder.run();
        await this.usuariosSeeder.run();
        await this.regionesSeeder.run();
    }
}

