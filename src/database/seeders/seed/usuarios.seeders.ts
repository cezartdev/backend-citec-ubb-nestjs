import { Injectable } from '@nestjs/common';
import { Usuarios } from '../../models/usuarios.model';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import { ESTADOS } from '../../../common/constants/estados.constants';

@Injectable()
export class UsuariosSeeder {
    async run() {
        const archivoUsuariosPath = path.resolve(
            __dirname,
            '../archives/usuarios.csv',
        );

        if (!fs.existsSync(archivoUsuariosPath)) {
            throw new Error(`Archivo no encontrado: ${archivoUsuariosPath}`);
        }

        const archivoUsuarios = fs.readFileSync(archivoUsuariosPath, 'utf-8');

        const usuarios = parse(archivoUsuarios, {
            columns: true,
            skip_empty_lines: true,
        });

        for (const usuario of usuarios) {
            await Usuarios.findOrCreate({
                where: { email: usuario.email },
                defaults: {
                    ...usuario,
                },
            });
        }

        console.log('Usuarios importados desde CSV exitosamente.');
    }
}
