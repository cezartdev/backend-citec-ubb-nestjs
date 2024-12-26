import { Module, Global, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SeederService } from './seeders/services/seeder.service';

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
    ],
    exports: [Sequelize],
})
export class DatabaseModule implements OnApplicationBootstrap {
    constructor(private readonly seederService: SeederService) {}

    // Descomentar para ejecutar los seeders al iniciar la aplicación
    async onApplicationBootstrap() {
        console.log('Ejecutando seeders...');
        await this.seederService.run();
    }
}
