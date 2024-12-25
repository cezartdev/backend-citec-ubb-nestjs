import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Tipos } from '../../models/tipos.model';
import { Usuarios } from '../../models/usuarios.model';

@Injectable()
export class SeederService {
    constructor(private readonly sequelize: Sequelize) {}

    async run() {
        // Sincronizar las tablas (esto creará las tablas en el orden correcto)
        await this.sequelize.sync();

        // Obtener los modelos registrados
        const models = this.sequelize.models;

        // Obtener los seeders en el orden correcto
        const seeders = await this.generateSeeders(models);

        // Obtener las dependencias entre los modelos
        const dependencies = await this.getModelDependencies(Object.values(models));

        // Ordenar los seeders según las dependencias
        const orderedSeeders = this.topologicalSort(seeders, dependencies);

        // Ejecutar seeders en el orden correcto
        for (const seeder of orderedSeeders) {
            await seeder.run();
        }
    }

    // Generar dinámicamente los seeders basados en los modelos
    private async generateSeeders(models: Record<string, any>) {
        const seeders = [];

        for (const modelName in models) {
            const model = models[modelName];

            // Crear una función para cada modelo que realice el seeding
            const seederFunction = this.createSeederFunction(model);
            if (seederFunction) {
                seeders.push({ name: modelName, run: seederFunction });
            }
        }

        return seeders;
    }

    // Crear una función de seeding para cada modelo
    private createSeederFunction(model: any) {
        switch (model.name) {
            case 'Tipos':
                return this.seedTipos;
            case 'Usuarios':
                return this.seedUsuarios;
            // Puedes agregar más modelos aquí según sea necesario
            default:
                return null;
        }
    }

    // Obtener las dependencias de los modelos a partir de sus asociaciones
    private async getModelDependencies(models: any[]) {
        const dependencies: Record<string, string[]> = {};

        // Recorrer cada modelo y sus asociaciones
        for (const model of models) {
            const associations = model.associations;
            const modelName = model.name;

            // Obtener los modelos de los que depende este modelo
            const dependentModels = Object.keys(associations).map((associationName) => {
                const association = associations[associationName];
                if (association.associationType === 'BelongsTo') {
                    return association.target.name;
                }
                return null;
            }).filter((targetModel) => targetModel !== null);

            dependencies[modelName] = dependentModels;
        }

        return dependencies;
    }

    // Algoritmo de ordenación topológica
    private topologicalSort(seeders: any[], dependencies: Record<string, string[]>) {
        const sorted: any[] = [];
        const visited: Set<string> = new Set();

        const visit = (seederName: string) => {
            if (visited.has(seederName)) return;
            visited.add(seederName);

            // Visitar las dependencias del seeder
            const deps = dependencies[seederName] || [];
            for (const dep of deps) {
                visit(dep);
            }

            // Agregar el seeder al orden final
            sorted.push(seeders.find((seeder) => seeder.name === seederName));
        };

        // Visitar todos los seeders
        seeders.forEach((seeder) => visit(seeder.name));

        return sorted;
    }

    // Seeder de Tipos
    private async seedTipos() {
        const tipos = [{ nombre: 'Admin' }, { nombre: 'User' }];
        for (const tipo of tipos) {
            await Tipos.findOrCreate({
                where: { nombre: tipo.nombre },
                defaults: tipo,
            });
        }
        console.log('Seed de Tipos completado.');
    }

    // Seeder de Usuarios
    private async seedUsuarios() {
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
        console.log('Seed de Usuarios completado.');
    }
}
