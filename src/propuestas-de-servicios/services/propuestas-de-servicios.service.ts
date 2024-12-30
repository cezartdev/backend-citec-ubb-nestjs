import {
    Injectable,
    NotFoundException,
    ConflictException,
    ForbiddenException,
} from '@nestjs/common';

import { PropuestasDeServicios } from 'src/database/models/propuestas-de-servicios.model';

import {
    CrearPropuestasDeServiciosDto,
    ActualizarPropuestasDeServiciosDto,
    ObtenerPorIdPropuestasDeServiciosDto,
    EliminarPropuestasDeServiciosDto,
} from '../dtos/propuestas-de-servicios.dto';

import { BaseServices } from '../../common/base/base-services.class';
import { ESTADOS } from 'src/common/constants/estados.constants';
import Empresas from 'src/database/models/empresas.model';

@Injectable()
export class PropuestasDeServiciosService extends BaseServices {
    async crear(propuesta: CrearPropuestasDeServiciosDto): Promise<PropuestasDeServicios> {
        const año = new Date().getFullYear();
        const rutReceptor = await Empresas.findOne({ where: { rut: propuesta.rut_receptor } });
        if(!rutReceptor) {
            throw new NotFoundException(
                [`Empresa con rut ${propuesta.rut_receptor} no encontrada`],
            );
        }
        const propuestaCreada = await PropuestasDeServicios.create({
            ...propuesta, año
        });

        return propuestaCreada;
    }

    async obtenerTodos(): Promise<PropuestasDeServicios[]> {
        const propuestas = await PropuestasDeServicios.findAll({
            where: { estado: ESTADOS.OPCION_1 },
        });
        return propuestas;
    }

    async obtenerTodosEliminados(): Promise<PropuestasDeServicios[]> {
        const propuestas = await PropuestasDeServicios.findAll({
            where: { estado: ESTADOS.OPCION_2 },
        });
        return propuestas;
    }

    async obtenerPorId(
        clavePrimaria: ObtenerPorIdPropuestasDeServiciosDto,
    ): Promise<PropuestasDeServicios> {
        const propuesta = await PropuestasDeServicios.findOne({
            where: { codigo: clavePrimaria.codigo, año: clavePrimaria.año },
        });

        if (!propuesta) {
            throw new NotFoundException(
                [`Propuesta con codigo ${clavePrimaria.codigo} y año ${clavePrimaria.año} no encontrado`],
            );
        }

        return propuesta;
    }

    async actualizar(
        propuesta: ActualizarPropuestasDeServiciosDto,
    ): Promise<PropuestasDeServicios> {
        const propuestaExistente = await PropuestasDeServicios.findOne({
            where: { codigo: propuesta.codigo, año: propuesta.año },
        });

        if (!propuesta) {
            throw new NotFoundException(
                [`Propuesta con codigo ${propuesta.codigo} y año ${propuesta.año} no encontrado`],
            );
        }

        return await propuestaExistente.update({ ...propuesta });
    }

    async eliminar(
        clavePrimaria: EliminarPropuestasDeServiciosDto,
    ): Promise<PropuestasDeServicios> {
        const propuestaExistente = await PropuestasDeServicios.findOne({
            where: { codigo: clavePrimaria.codigo, año: clavePrimaria.año },
        });

        if (!propuestaExistente) {
            throw new NotFoundException(
                [`Propuesta con codigo ${clavePrimaria.codigo} no encontrado`],
            );
        }

        const filasAfectadas = await PropuestasDeServicios.update(
            { estado: ESTADOS.OPCION_2 },
            { where: { codigo: clavePrimaria.codigo, año: clavePrimaria.año } },
        );        

        const propuestaExistenteActualizada = await PropuestasDeServicios.findOne({
            where: { codigo: clavePrimaria.codigo, año: clavePrimaria.año },
        }); 

        return propuestaExistenteActualizada;

    }
}
