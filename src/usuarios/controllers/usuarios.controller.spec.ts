import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsuariosModule } from '../usuarios.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Usuarios } from '../../database/models/usuarios.model';
import { Tipos } from '../../database/models/tipos.model';

describe('UsuariosController (e2e)', () => {
    let app: INestApplication;

    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2Fycm9sbG9AZ21haWwuY29tIiwibm9tYnJlIjoiRGVzYXJyb2xsbyIsImFwZWxsaWRvIjoiRGVzYXJyb2xsbyIsImNvbnRyYXNlw7FhIjoiJDJiJDEwJEQ0LzBTSUdjSDFjRUZLZUxJaWM0d2VjQWJUWWFGRlRMTk5YSlVBOTdqSnJrOExtcUhJSlJtIiwiZXN0YWRvIjoiQUNUSVZPIiwibm9tYnJlX3RpcG9zIjoiQURNSU5JU1RSQURPUiIsImNyZWF0ZWRBdCI6IjIwMjQtMTItMjlUMjE6NTA6MTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTItMjlUMjE6NTA6MTAuMDAwWiIsImlhdCI6MTczNTU5NjAwMiwiZXhwIjo0ODkxMzU2MDAyfQ.hGmV_Otp4dGDYsPy70NuPCcdmCA-F9Rp0uAUmFtgL6U'; // Tu token actual

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
                SequelizeModule.forFeature([Tipos]), // Importante: registramos el modelo
                UsuariosModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        // Crear datos necesarios antes de las pruebas
        const tiposModel = app.get(getModelToken(Tipos));
        await tiposModel.create({
            nombre: 'ADMINISTRADOR',
            // Incluye aquí otros campos requeridos para el modelo Tipos
        });
    });

    it('debería crear un usuario', async () => {
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

    afterAll(async () => {
        await app.close();
    });
});
