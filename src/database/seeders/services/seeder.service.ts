import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Tipos } from '../../models/tipos.model';
import { Usuarios } from '../../models/usuarios.model';

@Injectable()
export class SeederService {
    constructor(private readonly sequelize: Sequelize) {}

    async run() {
    }

 
}
