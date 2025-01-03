import { Module, Global, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SeederService } from './seeders/services/seeder.service';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TiposSeeder } from './seeders/seed/tipos.seeders';
import { UsuariosSeeder } from './seeders/seed/usuarios.seeders';
@Global()
@Module({
    providers: [
        {
            provide: Sequelize,
            useFactory: async () => {
                const sequelize = new Sequelize(process.env.DATABASE_URL, {
                    logging: false,
                    models: [__dirname + '/models/**/*.model.js'],
                });

                await sequelize.sync();
                return sequelize;
            },
        },
        SeederService,
        TiposSeeder,
        UsuariosSeeder,
    ],
    exports: [Sequelize],
})
export class DatabaseModule implements OnApplicationBootstrap {
    constructor(private readonly seederService: SeederService,@Inject(config.KEY) private configService: ConfigType<typeof config> ) {}

    // Descomentar para ejecutar los seeders al iniciar la aplicación
    async onApplicationBootstrap() {
        
        if (this.configService.node.env !== 'test') {
            console.log('Ejecutando seeders...');
            await this.seederService.run();
        }
    }
}
