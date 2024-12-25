import { Injectable } from '@nestjs/common';
import { Usuarios } from '../../models/usuarios.model';

@Injectable()
export class UsuariosSeeder {
    async run() {
        const usuarios = [
            {
                email: 'admin@example.com',
                nombre: 'Admin',
                apellido: 'User',
                contraseña: 'hashedpassword',
                nombre_tipos: 'Admin',
            },
        ];

        for (const usuario of usuarios) {
            await Usuarios.findOrCreate({
                where: { email: usuario.email },
                defaults: usuario,
            });
        }
        console.log('Usuarios seed ejecutado.');
    }
}