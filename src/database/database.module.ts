import { Module, Global, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SeederService } from './seeders/services/seeder.service';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TiposSeeder } from './seeders/seed/tipos.seeders';
import { UsuariosSeeder } from './seeders/seed/usuarios.seeders';
import { RegionesSeeder } from './seeders/seed/regiones.seeders';
import { ProvinciasSeeder } from './seeders/seed/provincias.seeders';
import { ComunasSeeder } from './seeders/seed/comunas.seeders';
import { EmpresasSeeder } from './seeders/seed/empresas.seeders';
import { CategoriasSeeder } from './seeders/seed/categorias.seeders';
import { GirosSeeder } from './seeders/seed/giros.seeders';
@Global()
@Module({
    providers: [
        {
            provide: Sequelize,
            useFactory: async () => {
                const sequelize = new Sequelize(process.env.DATABASE_URL, {
                    logging: false,
                    models: [__dirname + '/models/**/*.model.js'],
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000,
                        evict: 10000,
                    },
                    
                });

                await sequelize.sync();
                return sequelize;
            },
        },
        SeederService,
        TiposSeeder,
        UsuariosSeeder,
        RegionesSeeder,
        ProvinciasSeeder,
        ComunasSeeder,
        EmpresasSeeder,
        CategoriasSeeder,
        GirosSeeder,
    ],
    exports: [Sequelize],
})
export class DatabaseModule implements OnApplicationBootstrap {
    constructor(
        private readonly seederService: SeederService,
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}

    // Descomentar para ejecutar los seeders al iniciar la aplicación
    async onApplicationBootstrap() {
        if (this.configService.node.env !== 'test') {
            console.log('Ejecutando seeders...');
            await this.seederService.run();
        }
    }
}
