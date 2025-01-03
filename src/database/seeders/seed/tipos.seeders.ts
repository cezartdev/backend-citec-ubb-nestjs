import { Injectable } from '@nestjs/common';
import { Tipos } from '../../models/tipos.model';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import { ESTADOS } from '../../../common/constants/estados.constants';

@Injectable()
export class TiposSeeder {
    async run() {
        const archivoTiposPath = path.resolve(__dirname, '../archives/tipos.csv');

        if (!fs.existsSync(archivoTiposPath)) {
            throw new Error(`Archivo no encontrado: ${archivoTiposPath}`);
        }

        const archivoTipos = fs.readFileSync(archivoTiposPath, 'utf-8');

        const tipos = parse(archivoTipos, {
            columns: true,
            skip_empty_lines: true
        });

        for (const tipo of tipos) {
            await Tipos.findOrCreate({
                where: { nombre: tipo.nombre },
                defaults: {
                    ...tipo
                }
            });
        }

        console.log('Tipos importados desde CSV exitosamente.');
    }
}