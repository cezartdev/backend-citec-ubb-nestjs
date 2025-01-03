import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PropuestasDeServicios } from '../../database/models/propuestas-de-servicios.model';

import {
    CrearPropuestasDeServiciosDto,
    ActualizarPropuestasDeServiciosDto,
    ObtenerPorIdPropuestasDeServiciosDto,
    EliminarPropuestasDeServiciosDto,
    RetornoPropuestaDeServicio,
} from '../dtos/propuestas-de-servicios.dto';

import { BaseServices } from '../../common/base/base-services.class';
import { ESTADOS } from '../../common/constants/estados.constants';
import {Empresas} from '../../database/models/empresas.model';
import {GruposDeServicios} from 'src/database/models/grupos-de-servicios.model';
import {SubServicios} from 'src/database/models/sub-servicios.model';
import { PropuestaDeServicioServicios } from 'src/database/models/propuesta-de-servicio-servicios.model';
import { PropuestaDeServicioSubServicios } from 'src/database/models/propuesta-de-servicio-sub-servicios.model';
import { Adjudicado } from 'src/common/constants/adjudicados.constants';

@Injectable()
export class PropuestasDeServiciosService extends BaseServices {
    async crear(propuesta: CrearPropuestasDeServiciosDto): Promise<RetornoPropuestaDeServicio> {
        const año = new Date().getFullYear();
        const rutReceptor = await Empresas.findOne({ where: { rut: propuesta.rut_receptor } });
        if(!rutReceptor) {
            throw new NotFoundException(
                [`Empresa con rut ${propuesta.rut_receptor} no encontrada`],
            );
        }
        const grupos = await GruposDeServicios.findAll();
        const subservicios = await SubServicios.findAll();
        for (const grupo of propuesta.grupos_de_servicios) {
            const grupoExistente = grupos.find((g) => g.nombre === grupo.nombre);
            if (!grupoExistente) {
                throw new NotFoundException(
                    [`Grupo de servicios con nombre ${grupo.nombre} no encontrado`],
                );
            }
            for (const subservicio of grupo.sub_servicios) {
                const subservicioExistente = subservicios.find((s) => s.nombre === subservicio.nombre);
                if (!subservicioExistente) {
                    throw new NotFoundException(
                        [`Subservicio con nombre ${subservicio.nombre} no encontrado`],
                    );
                }
            }
        }

        const propuestaCreada = await PropuestasDeServicios.create({
            pago:propuesta.pago, año, fecha:propuesta.fecha, rut_receptor:propuesta.rut_receptor, adjudicado: propuesta.adjudicado,
            
        });

        for (const grupo of propuesta.grupos_de_servicios) {
            const gruposDeServicios = await PropuestaDeServicioServicios.create({
                codigo: propuestaCreada.codigo, año: propuestaCreada.año, nombre: grupo.nombre,
            });
            for (const subservicio of grupo.sub_servicios) {
                const subservicios = await PropuestaDeServicioSubServicios.create({
                    codigo: propuestaCreada.codigo, año: propuestaCreada.año, nombre: subservicio.nombre,
                });
            }
        }

        const retorno: RetornoPropuestaDeServicio = {
            codigo: propuestaCreada.codigo,
            año: propuestaCreada.año,
            pago: propuestaCreada.pago,
            fecha: propuestaCreada.fecha,
            rut_receptor: propuestaCreada.rut_receptor,
            adjudicado: propuestaCreada.adjudicado as Adjudicado,
            grupos_de_servicios: propuesta.grupos_de_servicios,
        };
        return retorno;
    }

    async obtenerTodos(): Promise<RetornoPropuestaDeServicio[]> {
        const propuestas = await PropuestasDeServicios.findAll({
            where: { estado: ESTADOS.OPCION_1 },
        });

        const retorno: RetornoPropuestaDeServicio[] = [];
        for (const propuesta of propuestas) {
            const gruposDeServicios = await PropuestaDeServicioServicios.findAll({
                where: { codigo: propuesta.codigo, año: propuesta.año },
                include: [GruposDeServicios],
            });

            const gruposDeServiciosRetorno = [];
            for (const grupo of gruposDeServicios) {
                const subServicios = await PropuestaDeServicioSubServicios.findAll({
                    where: { codigo: propuesta.codigo, año: propuesta.año, nombre: grupo.nombre },
                    include: [SubServicios],
                });

                const subServiciosRetorno = [];
                for (const subservicio of subServicios) {
                    subServiciosRetorno.push({
                        nombre: subservicio.nombre,
                    });
                }

                gruposDeServiciosRetorno.push({
                    nombre: grupo.nombre,
                    sub_servicios: subServiciosRetorno,
                });
            }

            retorno.push({
                codigo: propuesta.codigo,
                año: propuesta.año,
                pago: propuesta.pago,
                fecha: propuesta.fecha,
                rut_receptor: propuesta.rut_receptor,
                adjudicado: propuesta.adjudicado as Adjudicado,
                grupos_de_servicios: gruposDeServiciosRetorno,
            });
        }
        
        return retorno;
    }

    async obtenerTodosEliminados(): Promise<RetornoPropuestaDeServicio[]> {
        const propuestas = await PropuestasDeServicios.findAll({
            where: { estado: ESTADOS.OPCION_2 },
        });
        const retorno: RetornoPropuestaDeServicio[] = [];
        for (const propuesta of propuestas) {
            const gruposDeServicios = await PropuestaDeServicioServicios.findAll({
                where: { codigo: propuesta.codigo, año: propuesta.año },
                include: [GruposDeServicios],
            });

            const gruposDeServiciosRetorno = [];
            for (const grupo of gruposDeServicios) {
                const subServicios = await PropuestaDeServicioSubServicios.findAll({
                    where: { codigo: propuesta.codigo, año: propuesta.año, nombre: grupo.nombre },
                    include: [SubServicios],
                });

                const subServiciosRetorno = [];
                for (const subservicio of subServicios) {
                    subServiciosRetorno.push({
                        nombre: subservicio.nombre,
                    });
                }

                gruposDeServiciosRetorno.push({
                    nombre: grupo.nombre,
                    sub_servicios: subServiciosRetorno,
                });
            }

            retorno.push({
                codigo: propuesta.codigo,
                año: propuesta.año,
                pago: propuesta.pago,
                fecha: propuesta.fecha,
                rut_receptor: propuesta.rut_receptor,
                adjudicado: propuesta.adjudicado as Adjudicado,
                grupos_de_servicios: gruposDeServiciosRetorno,
            });
        }
        return retorno;
    }

    async obtenerPorId(
        clavePrimaria: ObtenerPorIdPropuestasDeServiciosDto,
    ): Promise<RetornoPropuestaDeServicio> {
        const propuesta = await PropuestasDeServicios.findOne({
            where: { codigo: clavePrimaria.codigo, año: clavePrimaria.año },
        });

        if (!propuesta) {
            throw new NotFoundException(
                [`Propuesta con codigo ${clavePrimaria.codigo} y año ${clavePrimaria.año} no encontrado`],
            );
        }

        const gruposDeServicios = await PropuestaDeServicioServicios.findAll({
            where: { codigo: propuesta.codigo, año: propuesta.año },
            include: [GruposDeServicios],
        });
    
        const gruposDeServiciosRetorno = [];
        for (const grupo of gruposDeServicios) {
            const subServicios = await PropuestaDeServicioSubServicios.findAll({
                where: { codigo: propuesta.codigo, año: propuesta.año, nombre: grupo.nombre },
                include: [SubServicios],
            });
    
            const subServiciosRetorno = [];
            for (const subservicio of subServicios) {
                subServiciosRetorno.push({
                    nombre: subservicio.nombre,
                });
            }
    
            gruposDeServiciosRetorno.push({
                nombre: grupo.nombre,
                sub_servicios: subServiciosRetorno,
            });
        }
    
        return {
            codigo: propuesta.codigo,
            año: propuesta.año,
            pago: propuesta.pago,
            fecha: propuesta.fecha,
            rut_receptor: propuesta.rut_receptor,
            adjudicado: propuesta.adjudicado as Adjudicado,
            grupos_de_servicios: gruposDeServiciosRetorno,
        };
    }

    async actualizar(
        propuesta: ActualizarPropuestasDeServiciosDto,
    ): Promise<RetornoPropuestaDeServicio> {
        const propuestaExistente = await PropuestasDeServicios.findOne({
            where: { codigo: propuesta.codigo, año: propuesta.año },
        });

        if (!propuesta) {
            throw new NotFoundException(
                [`Propuesta con codigo ${propuesta.codigo} y año ${propuesta.año} no encontrado`],
            );
        }

        await propuestaExistente.update({ ...propuesta });

        const gruposDeServicios = await PropuestaDeServicioServicios.findAll({
            where: { codigo: propuesta.codigo, año: propuesta.año },
            include: [GruposDeServicios],
        });
    
        const gruposDeServiciosRetorno = [];
        for (const grupo of gruposDeServicios) {
            const subServicios = await PropuestaDeServicioSubServicios.findAll({
                where: { codigo: propuesta.codigo, año: propuesta.año, nombre: grupo.nombre },
                include: [SubServicios],
            });
    
            const subServiciosRetorno = [];
            for (const subservicio of subServicios) {
                subServiciosRetorno.push({
                    nombre: subservicio.nombre,
                });
            }
    
            gruposDeServiciosRetorno.push({
                nombre: grupo.nombre,
                sub_servicios: subServiciosRetorno,
            });
        }

        const retorno: RetornoPropuestaDeServicio = {
            codigo: propuestaExistente.codigo,
            año: propuestaExistente.año,
            pago: propuestaExistente.pago,
            fecha: propuestaExistente.fecha,
            rut_receptor: propuestaExistente.rut_receptor,
            adjudicado: propuestaExistente.adjudicado as Adjudicado,
            grupos_de_servicios: gruposDeServiciosRetorno,
        };
        return retorno;
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
