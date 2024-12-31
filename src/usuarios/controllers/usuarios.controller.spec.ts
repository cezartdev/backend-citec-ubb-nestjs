import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';
import {
    CrearUsuariosDto,
    ActualizarUsuariosDto,
    EliminarUsuariosDto,
    ObtenerPorIdUsuariosDto,
} from '../dtos/usuarios.dto';
import { INestApplication } from '@nestjs/common';
import { TIPOS_DE_USUARIO } from '../../common/constants/tipos-usuarios.constants';
import { ESTADOS } from '../../common/constants/estados.constants';
import { ErrorRespuestaDto } from '../../common/dto/error-respuesta.dto';
import * as request from 'supertest';

// Mockear el modelo Usuarios
// jest.mock('sequelize', () => {
//     const SequelizeMock = require('sequelize-mock');
//     const dbMock = new SequelizeMock();
//     return {
//         Sequelize: SequelizeMock,
//         DataTypes: SequelizeMock.DataTypes,
//         Model: SequelizeMock.Model,
//         Op: SequelizeMock.Op,
//         ...SequelizeMock,
//     };
// });

// jest.mock('@nestjs/sequelize', () => ({
//     SequelizeModule: {
//         forRoot: jest.fn(),
//         forFeature: jest.fn(),
//     },
// }));

// jest.mock('../../database/models/usuario.model', () => {
//     return {
//         // Mockea el modelo específico
//     };
// });

// jest.mock('../../database/models/usuarios.model', () => {
//     return {
//         findOne: jest.fn().mockResolvedValue(null), // Mockea el método findOne
//         // Mockea otros métodos según sea necesario
//     };
// });

describe('UsuariosController', () => {
    let usuariosController: UsuariosController;
    let usuariosService: UsuariosService;
    let app: INestApplication;

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [UsuariosService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('debería estar definido', () => {
        expect(usuariosController).toBeDefined();
    });

    const crearUsuarioDto: CrearUsuariosDto = {
        email: 'test@test.com',
        nombre: 'Test',
        apellido: 'Test',
        contraseña: '123456',
        estado: ESTADOS.OPCION_1,
        nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
    };
    const errorUsuarioEmail: any = {
        emai: 'test@test.com', // error intencionado
        nombre: 'Test',
        apellido: 'Test',
        contraseña: '123456',
        estado: ESTADOS.OPCION_1,
        nombre_tipos: TIPOS_DE_USUARIO.OPCION_1,
    };
    describe('crear (POST)', () => {
        it('debería crear un usuario', async () => {
            const res = await request(app.getHttpServer())
                .post('/usuarios/crear')
                .send({
                    ...crearUsuarioDto,
                });
            // expect(res.headers["content-type"]).toMatch(/json/)
            // expect(res.status).toBe(200)
            // expect(res.body)
            // return request(app.getHttpServer())
            //     .post('/usuarios/crear')
            //     .send({
            //         email: 'test@test.com',
            //         nombre: 'Test',
            //         apellido: 'Test',
            //         contraseña: '123456',
            //         estado: 'ACTIVO',
            //         nombre_tipos: 'ADMIN',
            //     })
            //     .expect(201)
            //     .expect((res) => {
            //         expect(res.body).toHaveProperty('email', 'test@test.com');
            //     });
            console.log(res.body);
            // expect(res.headers["content-type"]).toMatch(/json/)
            expect(res.status).toBe(201);
        });
    });

    // describe('obtenerPorId', () => {
    //     it('debería obtener un usuario por email', async () => {
    //         const emailDto: ObtenerPorIdUsuariosDto = { email: 'test@test.com' };
    //         const usuario = new Usuarios();
    //         Object.assign(usuario, {
    //             email: 'test@test.com',
    //             nombre: 'Test',
    //             apellido: 'User',
    //             tipo: 'OPCION_1',
    //             estado: 'ACTIVO',
    //             nombre_tipos: 'ADMIN'
    //         });

    //         jest.spyOn(usuariosService, 'obtenerPorId').mockResolvedValue(usuario);

    //         const result = await usuariosController.obtenerPorId(emailDto);
    //         expect(result).toEqual(usuario);
    //         expect(usuariosService.obtenerPorId).toHaveBeenCalledWith(emailDto);
    //     });
    // });

    // describe('actualizar', () => {
    //     it('debería actualizar un usuario', async () => {
    //         const usuarioDto: ActualizarUsuariosDto = {
    //             email: 'test@test.com',
    //             contraseña: '123456',
    //             nombre: 'Test Updated',
    //             apellido: 'User Updated',
    //             tipo: 'OPCION_1',
    //             estado: 'ACTIVO',
    //             nombre_tipos: 'ADMIN'
    //         };

    //         const usuarioActualizado = new Usuarios();
    //         Object.assign(usuarioActualizado, usuarioDto);

    //         jest.spyOn(usuariosService, 'actualizar').mockResolvedValue(usuarioActualizado);

    //         const result = await usuariosController.actualizar(usuarioDto);
    //         expect(result).toEqual(usuarioActualizado);
    //         expect(usuariosService.actualizar).toHaveBeenCalledWith(usuarioDto);
    //     });
    // });

    // describe('eliminar', () => {
    //     it('debería eliminar un usuario', async () => {
    //         const emailDto: EliminarUsuariosDto = { email: 'test@test.com' };
    //         const usuarioEliminado = new Usuarios();
    //         Object.assign(usuarioEliminado, { email: 'test@test.com' });

    //         jest.spyOn(usuariosService, 'eliminar').mockResolvedValue(usuarioEliminado);

    //         const result = await usuariosController.eliminar(emailDto);
    //         expect(result).toEqual(usuarioEliminado);
    //         expect(usuariosService.eliminar).toHaveBeenCalledWith(emailDto);
    //     });
    // });

    // describe('obtenerTodos', () => {
    //     it('debería devolver una lista de usuarios', async () => {
    //         const result = await usuariosController.obtenerTodos();
    //         expect(result).toEqual([]);
    //         expect(usuariosService.obtenerTodos).toHaveBeenCalled();
    //     });
    // });

    // Puedes añadir más pruebas para otros métodos del controlador
});
