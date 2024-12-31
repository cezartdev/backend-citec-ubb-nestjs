import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuariosModule } from '../usuarios.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Usuarios } from '../../database/models/usuarios.model';
import { Tipos } from '../../database/models/tipos.model';
import { TIPOS_DE_USUARIO } from '../../common/constants/tipos-usuarios.constants';

describe('UsuariosController (e2e)', () => {
    let app: INestApplication;

    const token = process.env.TOKEN_AUTORIZACION;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    storage: ':memory:',
                    models: [Usuarios, Tipos], // Registra el modelo
                    logging: false,
                    autoLoadModels: true,
                    synchronize: true,
                }),
                SequelizeModule.forFeature([Usuarios,Tipos]), // Importante: registramos el modelo
                UsuariosModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        /**
         * Crear datos necesarios antes de las pruebas
         */
        const tiposModel = app.get(getModelToken(Tipos));
        const tipos = Object.values(TIPOS_DE_USUARIO);
        for (const tipo of tipos) {
            await tiposModel.create({
                nombre: tipo,
            });
        }
    });

    describe('crear', async () => {
        
        it('crear usuario correctamente', async () => {
            const crearUsuarioDto = {
                email: 'test@test.com',
                nombre: 'Test',
                apellido: 'Test',
                contraseña: '123456',
                estado: 'ACTIVO',
                nombre_tipos: 'ADMINISTRADOR',
            };
    
            return request(app.getHttpServer())
                .post('/usuarios/crear')
                .auth(token, { type: 'bearer' })
                .send(crearUsuarioDto)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toHaveProperty('email', 'test@test.com');
                });
        });

        it('fallar si falta un campo', async () => {
           
        });

        it('fallar si el email ya existe', async () => {
           
        });


    })
        

    afterAll(async () => {
        await app.close();
    });
});
