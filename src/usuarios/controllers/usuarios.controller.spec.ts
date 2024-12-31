import * as request from 'supertest';

describe('UsuariosController (e2e)', () => {
    const baseUrl = 'http://localhost:4000/api'; // Ajusta esto a la URL de tu servidor
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlc2Fycm9sbG9AZ21haWwuY29tIiwibm9tYnJlIjoiRGVzYXJyb2xsbyIsImFwZWxsaWRvIjoiRGVzYXJyb2xsbyIsImNvbnRyYXNlw7FhIjoiJDJiJDEwJEQ0LzBTSUdjSDFjRUZLZUxJaWM0d2VjQWJUWWFGRlRMTk5YSlVBOTdqSnJrOExtcUhJSlJtIiwiZXN0YWRvIjoiQUNUSVZPIiwibm9tYnJlX3RpcG9zIjoiQURNSU5JU1RSQURPUiIsImNyZWF0ZWRBdCI6IjIwMjQtMTItMjlUMjE6NTA6MTAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTItMjlUMjE6NTA6MTAuMDAwWiIsImlhdCI6MTczNTU5NjAwMiwiZXhwIjo0ODkxMzU2MDAyfQ.hGmV_Otp4dGDYsPy70NuPCcdmCA-F9Rp0uAUmFtgL6U';

    it('debería crear un usuario', async () => {
        const crearUsuarioDto = {
            email: 'test@test.com',
            nombre: 'Test',
            apellido: 'Test',
            contraseña: '123456',
            estado: 'ACTIVO',
            nombre_tipos: 'ADMINISTRADOR',
        };

        const res = await request(baseUrl)
            .post('/usuarios/crear')
            .auth(token, { type: 'bearer' })
            .send(crearUsuarioDto);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('email', 'test@test.com');
    });


});
