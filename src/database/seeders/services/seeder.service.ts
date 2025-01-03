import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../../../config';
import { UsuariosSeeder } from '../seed/usuarios.seeders';
import { TiposSeeder } from '../seed/tipos.seeders';
import { RegionesSeeder } from '../seed/regiones.seeders';
import { ProvinciasSeeder } from '../seed/provincias.seeders';
import { ComunasSeeder } from '../seed/comunas.seeders';
import { EmpresasSeeder } from '../seed/empresas.seeders';

@Injectable()
export class SeederService {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        private readonly tiposSeeder: TiposSeeder,
        private readonly usuariosSeeder: UsuariosSeeder,
        private readonly regionesSeeder: RegionesSeeder,
        private readonly provinciasSeeder: ProvinciasSeeder,
        private readonly comunasSeeder: ComunasSeeder,
        private readonly empresasSeeder: EmpresasSeeder,
    ) {}

    async run() {
        await this.tiposSeeder.run();
        await this.usuariosSeeder.run();
        await this.regionesSeeder.run();
        await this.provinciasSeeder.run();
        await this.comunasSeeder.run();
        await this.empresasSeeder.run();
    }
}
