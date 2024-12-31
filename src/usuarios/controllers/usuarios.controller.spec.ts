import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';

describe('UsuariosController', () => {
    let usuariosController: UsuariosController;
    let usuariosService: UsuariosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [
                {
                    provide: UsuariosService,
                    useValue: {
                        crear: jest.fn(),
                        obtenerTodos: jest.fn().mockResolvedValue([]),
                        obtenerPorId: jest.fn(),
                        actualizar: jest.fn(),
                        eliminar: jest.fn(),
                    },
                },
            ],
        }).compile();

        usuariosController = module.get<UsuariosController>(UsuariosController);
        usuariosService = module.get<UsuariosService>(UsuariosService);
    });

    it('debería estar definido', () => {
        expect(usuariosController).toBeDefined();
    });

    describe('obtenerTodos', () => {
        it('debería devolver una lista de usuarios', async () => {
            const result = await usuariosController.obtenerTodos();
            expect(result).toEqual([]);
            expect(usuariosService.obtenerTodos).toHaveBeenCalled();
        });
    });

    // Puedes añadir más pruebas para otros métodos del controlador
});
