import { Module, Global, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Usuarios } from './models/usuarios.model';
import { Tipos } from './models/tipos.model';
import { SeederService } from './seeders/services/seeder.service';
import { ClavesApis } from './models/claves-apis.model';


const databaseProviders = [
    {
        provide: Sequelize,
        useFactory: async () => {
            const sequelize = new Sequelize(process.env.DATABASE_URL, {
                logging: false,
            });
            sequelize.addModels([Usuarios, Tipos, ClavesApis]);
            await sequelize.sync();
            return sequelize;
        },
    }
];

@Global()
@Module({
    providers: [...databaseProviders, SeederService],
    exports: [...databaseProviders],
})
export class DatabaseModule implements OnApplicationBootstrap {
    constructor(private readonly seederService: SeederService) {}

    //Descomentar para iniciar los seeders
    async onApplicationBootstrap() {
        // console.log('Ejecutando seeders...');
        // await this.seederService.run();
    }
}
