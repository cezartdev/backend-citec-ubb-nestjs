import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsuariosModule } from '../usuarios.module';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Usuarios } from '../../database/models/usuarios.model';
import { Tipos } from '../../database/models/tipos.model';
import { TIPOS_DE_USUARIO } from '../../common/constants/tipos-usuarios.constants';
import { ActualizarUsuariosDto, CrearUsuariosDto } from '../dtos/usuarios.dto';
import { ESTADOS } from '../../common/constants/estados.constants';

describe('UsuariosController', () => {
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
                SequelizeModule.forFeature([Usuarios,Tipos]), // Importante: registramos los modelo
                UsuariosModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));

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

    const ruta = '/usuarios';

    describe('crear', () => {
        
        const crearUsuarioDto: CrearUsuariosDto = {
            email: 'test@test.com',
            nombre: 'Test',
            apellido: 'Test',
            contraseña: '123456',
            estado: ESTADOS.OPCION_1,
            nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
        };
        
        it('crear usuario correctamente', async () => {

            const res = await request(app.getHttpServer()).post(`${ruta}/crear`).send(crearUsuarioDto);

            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                email: crearUsuarioDto.email,
                nombre: crearUsuarioDto.nombre,
                apellido: crearUsuarioDto.apellido,
                estado: crearUsuarioDto.estado,
                nombre_tipos: crearUsuarioDto.nombre_tipos
            });
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            
            // Verificar que la contraseña sea un hash
            expect(res.body.contraseña).not.toBe(crearUsuarioDto.contraseña);
            expect(res.body.contraseña).toMatch(/^\$2[ayb]\$.{56}$/); // Patrón de hash bcrypt

        });


        it('fallar si falta un campo o esta mal escrito', async () => {
            // Probar cada campo faltante
            const camposAProbar = [
                { ...crearUsuarioDto, emai: crearUsuarioDto.email, email: undefined }, // Error en email
                { ...crearUsuarioDto, nombr: crearUsuarioDto.nombre, nombre: undefined }, // Error en nombre
                { ...crearUsuarioDto, apellid: crearUsuarioDto.apellido, apellido: undefined }, // Error en apellido
                { ...crearUsuarioDto, contraseñ: crearUsuarioDto.contraseña, contraseña: undefined }, // Error en contraseña
                { ...crearUsuarioDto, estad: crearUsuarioDto.estado, estado: undefined }, // Error en estado
                { ...crearUsuarioDto, nombre_tipo: crearUsuarioDto.nombre_tipos, nombre_tipos: undefined }, // Error en nombre_tipos
            ];

            for (const casoError of camposAProbar) {
                const res = await request(app.getHttpServer())
                    .post(`${ruta}/crear`)
                    .send(casoError);
                expect(res.status).toBe(400);
                expect(Array.isArray(res.body.message)).toBe(true);
                expect(res.body.statusCode).toBe(400);
                expect(res.body.error).toBe('Bad Request');
            }
        });

        it('fallar si el email ya existe', async () => {
            
            const crearUsuarioAntes = await request(app.getHttpServer()).post(`${ruta}/crear`).send(crearUsuarioDto);

            const res = await request(app.getHttpServer()).post(`${ruta}/crear`).send(crearUsuarioDto);

            expect(res.status).toBe(409);
            expect(Array.isArray(res.body.message)).toBe(true);
            expect(res.body.statusCode).toBe(409);
            expect(res.body.error).toBe('Conflict');
        });

        it('fallar si los tipos de datos no son válidos', async () => {
            const casosInvalidos = [
                {
                    ...crearUsuarioDto,
                    email: 123 // Error intencionado: número en lugar de string
                },
                {
                    ...crearUsuarioDto,
                    nombre: true // Error intencionado: booleano en lugar de string
                },
                {
                    ...crearUsuarioDto,
                    apellido: 123 // Error intencionado: número en lugar de string
                },
                {
                    ...crearUsuarioDto,
                    contraseña: true // Error intencionado: booleano en lugar de string
                },
                {
                    ...crearUsuarioDto,
                    estado: 'estado_invalido' // Error intencionado: string inválido
                },
                {
                    ...crearUsuarioDto,
                    nombre_tipos: 'tipo_invalido' // Error intencionado: string inválido
                }
            ];

            for (const caso of casosInvalidos) {
                const res = await request(app.getHttpServer()).post(`${ruta}/crear`).send(caso);
                expect(res.status).toBe(400);
                expect(Array.isArray(res.body.message)).toBe(true);
                expect(res.body.statusCode).toBe(400);
                expect(res.body.error).toBe('Bad Request');
            }
        });

        it('verificar transformación de datos: email en minúsculas, nombre/apellido capitalize, estado/tipos en mayúsculas', async () => {
            const datosPrueba = {
                ...crearUsuarioDto,
                email: 'USUARIO@TEST.COM',
                nombre: 'jUaN',
                apellido: 'pEREz',
                estado: 'activo',
                nombre_tipos: 'administrador'
            };

            const res = await request(app.getHttpServer())
                .post(`${ruta}/crear`)
                .send(datosPrueba);
            expect(res.status).toBe(201);
            expect(res.body.email).toBe('usuario@test.com');
            expect(res.body.nombre).toBe('Juan');
            expect(res.body.apellido).toBe('Perez');
            expect(res.body.estado).toBe('ACTIVO');
            expect(res.body.nombre_tipos).toBe('ADMINISTRADOR');
        });

    })


    describe('actualizar', () => {
        const crearUsuarioDto: CrearUsuariosDto = {
            email: 'test@test.com',
            nombre: 'Test',
            apellido: 'Test',
            contraseña: '123456',
            estado: ESTADOS.OPCION_1,
            nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
        };

        const actualizarUsuarioDto: ActualizarUsuariosDto = {
            email: 'test@test.com',
            nuevo_email: 'test2@test.com',
            nombre: 'Test',
            apellido: 'Test',
            contraseña: '123456',
            estado: ESTADOS.OPCION_1,
            nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
        };
        
        it('actualizar usuario correctamente', async () => {
            const crearUsuario = await request(app.getHttpServer()).post(`${ruta}/crear`).send(crearUsuarioDto);

            const res = await request(app.getHttpServer()).put(`${ruta}/actualizar`).send(actualizarUsuarioDto);

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                email: actualizarUsuarioDto.nuevo_email,
                nombre: actualizarUsuarioDto.nombre,
                apellido: actualizarUsuarioDto.apellido,
                estado: actualizarUsuarioDto.estado,
                nombre_tipos: actualizarUsuarioDto.nombre_tipos
            });
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            
            // Verificar que la contraseña sea un hash
            expect(res.body.contraseña).not.toBe(actualizarUsuarioDto.contraseña);
            expect(res.body.contraseña).toMatch(/^\$2[ayb]\$.{56}$/); // Patrón de hash bcrypt

        });


        it('fallar si falta un campo o esta mal escrito', async () => {
            // Probar cada campo faltante
            const camposAProbar = [
                { ...actualizarUsuarioDto, emai: actualizarUsuarioDto.nuevo_email, nuevo_email: undefined }, // Error en email
                { ...actualizarUsuarioDto, nombr: actualizarUsuarioDto.nombre, nombre: undefined }, // Error en nombre
                { ...actualizarUsuarioDto, apellid: actualizarUsuarioDto.apellido, apellido: undefined }, // Error en apellido
                { ...actualizarUsuarioDto, contraseñ: actualizarUsuarioDto.contraseña, contraseña: undefined }, // Error en contraseña
                { ...actualizarUsuarioDto, estad: actualizarUsuarioDto.estado, estado: undefined }, // Error en estado
                { ...actualizarUsuarioDto, nombre_tipo: actualizarUsuarioDto.nombre_tipos, nombre_tipos: undefined }, // Error en nombre_tipos
            ];

            for (const casoError of camposAProbar) {
                const res = await request(app.getHttpServer())
                    .put(`${ruta}/actualizar`)
                    .send(casoError);
                expect(res.status).toBe(400);
                expect(Array.isArray(res.body.message)).toBe(true);
                expect(res.body.statusCode).toBe(400);
                expect(res.body.error).toBe('Bad Request');
            }
        });

        it('fallar si el email ya existe', async () => {
            
            const actualizarUsuarioAntes = await request(app.getHttpServer()).post(`${ruta}/actualizar`).send(actualizarUsuarioDto);

            const res = await request(app.getHttpServer()).put(`${ruta}/actualizar`).send(actualizarUsuarioDto);

            expect(res.status).toBe(409);
            expect(Array.isArray(res.body.message)).toBe(true);
            expect(res.body.statusCode).toBe(409);
            expect(res.body.error).toBe('Conflict');
        });

        it('fallar si los tipos de datos no son válidos', async () => {
            const casosInvalidos = [
                {
                    ...actualizarUsuarioDto,
                    email: 123 // Error intencionado: número en lugar de string
                },
                {
                    ...actualizarUsuarioDto,
                    nombre: true // Error intencionado: booleano en lugar de string
                },
                {
                    ...actualizarUsuarioDto,
                    apellido: 123 // Error intencionado: número en lugar de string
                },
                {
                    ...actualizarUsuarioDto,
                    contraseña: true // Error intencionado: booleano en lugar de string
                },
                {
                    ...actualizarUsuarioDto,
                    estado: 'estado_invalido' // Error intencionado: string inválido
                },
                {
                    ...actualizarUsuarioDto,
                    nombre_tipos: 'tipo_invalido' // Error intencionado: string inválido
                }
            ];

            for (const caso of casosInvalidos) {
                const res = await request(app.getHttpServer()).put(`${ruta}/actualizar`).send(caso);
                expect(res.status).toBe(400);
                expect(Array.isArray(res.body.message)).toBe(true);
                expect(res.body.statusCode).toBe(400);
                expect(res.body.error).toBe('Bad Request');
            }
        });

        it('verificar transformación de datos: email en minúsculas, nombre/apellido capitalize, estado/tipos en mayúsculas', async () => {
            const datosPrueba = {
                ...actualizarUsuarioDto,
                email: 'USUARIO@TEST.COM',
                nombre: 'jUaN',
                apellido: 'pEREz',
                estado: 'activo',
                nombre_tipos: 'administrador'
            };

            const res = await request(app.getHttpServer())
                .put(`${ruta}/actualizar`)
                .send(datosPrueba);
            expect(res.status).toBe(200);
            expect(res.body.email).toBe('usuario@test.com');
            expect(res.body.nombre).toBe('Juan');
            expect(res.body.apellido).toBe('Perez');
            expect(res.body.estado).toBe('ACTIVO');
            expect(res.body.nombre_tipos).toBe('ADMINISTRADOR');
        });

    })
        

    afterAll(async () => {
        await app.close();
    });
});
