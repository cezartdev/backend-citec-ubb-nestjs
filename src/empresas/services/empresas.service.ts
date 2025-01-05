import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    ActualizarEmpresasDto,
    CrearEmpresasDto,
    EliminarEmpresasDto,
    RetornoEmpresasDto,
} from '../dtos/empresas.dto';
import { Empresas } from '../../database/models/empresas.model';
import { Comunas } from '../../database/models/comunas.model';
import { Giros } from '../../database/models/giros.model';
import { Contactos } from '../../database/models/contactos.model';
import { Estados, ESTADOS } from '../../common/constants/estados.constants';
import Usuarios from 'src/database/models/usuarios.model';
import { QueryTypes, Sequelize } from 'sequelize';

@Injectable()
export class EmpresasService {
    async crear(empresa: CrearEmpresasDto): Promise<RetornoEmpresasDto> {
        const empresaExistente = await Empresas.findOne({
            where: { rut: empresa.rut },
        });

        if (empresaExistente) {
            throw new ConflictException(['La empresa ya existe']);
        }

        const comuna = await Comunas.findOne({
            where: { id: empresa.id_comunas },
        });

        if (!comuna) {
            throw new NotFoundException(['La comuna no existe']);
        }

        const giros = await Giros.findAll({
            where: { codigo: empresa.giros },
        });

        if (giros.length !== empresa.giros.length) {
            // Encontrar qué giro no existe
            const girosEncontrados = giros.map((g) => g.codigo);
            const girosFaltantes = empresa.giros.filter(
                (g) => !girosEncontrados.includes(g),
            );

            throw new NotFoundException([
                `Los siguientes codigos de giros no existen: ${girosFaltantes.join(', ')}`,
            ]);
        }

        const empresaCreada = await Empresas.create({
            rut: empresa.rut,
            razon_social: empresa.razon_social,
            nombre_de_fantasia: empresa.nombre_de_fantasia,
            email_factura: empresa.email_factura,
            direccion: empresa.direccion,
            estado: ESTADOS.OPCION_1,
            id_comunas: empresa.id_comunas,
            telefono: empresa.telefono,
        });

        await empresaCreada.$add('giros', empresa.giros);

        if (empresa.contactos.length > 0) {
            await Promise.all(
                empresa.contactos.map(async (contacto) => {
                    await Contactos.create({
                        email: contacto.email,
                        nombre: contacto.nombre,
                        cargo: contacto.cargo,
                        rut_empresas: empresaCreada.rut,
                    });
                }),
            );
        }

        // Obtener la empresa con las relaciones incluídas
        const empresaRetorno = (await Empresas.findOne({
            where: { rut: empresaCreada.rut },
            attributes: {
                exclude: ['id_comunas'],
            },
            include: [
                {
                    model: Comunas,
                    as: 'comuna',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: Giros,
                    as: 'giros',
                    attributes: [
                        'codigo',
                        'nombre',
                        'afecto_iva',
                        'nombre_categorias',
                    ],
                    through: { attributes: [] },
                },
                {
                    model: Contactos,
                    as: 'contactos',
                    attributes: ['email', 'nombre', 'cargo'],
                },
            ],
        })) as RetornoEmpresasDto;

        return empresaRetorno;
    }

    async actualizar(
        empresa: ActualizarEmpresasDto,
    ): Promise<RetornoEmpresasDto> {

   
            const empresaExistente = await Empresas.findOne({
                where: { rut: empresa.rut },
     
            });

            if (!empresaExistente) {
                throw new NotFoundException([
                    `Empresa con el rut ${empresa.rut} no encontrada`,
                ]);
            }

            const empresaExistenteNuevo = await Empresas.findOne({
                where: { rut: empresa.nuevo_rut },
 
            });

            if (empresaExistenteNuevo) {
                throw new ConflictException([
                    `Ya existe una empresa con el rut ${empresa.nuevo_rut}`,
                ]);
            }

            const contactosExistentes = await Contactos.findAll({
                where: { rut_empresas: empresaExistente.rut },

            });

            if (empresa.contactos?.length > 0) {
                if (contactosExistentes.length > 0) {
                    await Contactos.destroy({
                        where: { rut_empresas: empresa.rut },

                    });
                }

                await Promise.all(
                    empresa.contactos.map(async (contacto) => {
                        await Contactos.create(
                            {
                                email: contacto.email,
                                nombre: contacto.nombre,
                                cargo: contacto.cargo,
                                rut_empresas: empresa.rut,
                            },
  
                        );
                    }),
                );
            }

            await empresaExistente.$set('giros', empresa.giros);

            try {
                
                await Empresas.update(
                    {
                        rut: empresa.nuevo_rut,
                        razon_social: empresa.razon_social,
                        nombre_de_fantasia: empresa.nombre_de_fantasia,
                        email_factura: empresa.email_factura,
                        direccion: empresa.direccion,
                        id_comunas: empresa.id_comunas,
                        telefono: empresa.telefono,
                    },
                    { where: { rut: empresa.rut } },
                );
            } catch (error) {
                await Empresas.sequelize.query(
                    'UPDATE empresas SET rut = :nuevo_rut, razon_social = :razon_social, nombre_de_fantasia = :nombre_de_fantasia, email_factura = :email_factura, direccion = :direccion, id_comunas = :id_comunas, telefono = :telefono WHERE rut = :rut',
                    {
                        replacements: {
                            nuevo_rut: empresa.nuevo_rut,
                            razon_social: empresa.razon_social,
                            nombre_de_fantasia: empresa.nombre_de_fantasia,
                            email_factura: empresa.email_factura,
                            direccion: empresa.direccion,
                            id_comunas: empresa.id_comunas,
                            telefono: empresa.telefono,
                            rut: empresa.rut,
                        },
                        type: QueryTypes.UPDATE,
                    },
                );
            }

            const empresaActualizadaRetorno = (await Empresas.findOne({
                where: { rut: empresa.nuevo_rut },
                attributes: { exclude: ['id_comunas'] },
                include: [
                    {
                        model: Comunas,
                        as: 'comuna',
                        attributes: ['id', 'nombre'],
                    },
                    {
                        model: Giros,
                        as: 'giros',
                        attributes: [
                            'codigo',
                            'nombre',
                            'afecto_iva',
                            'nombre_categorias',
                        ],
                        through: { attributes: [] },
                    },
                    {
                        model: Contactos,
                        as: 'contactos',
                        attributes: ['email', 'nombre', 'cargo'],
                    },
                ],

            })) as RetornoEmpresasDto;

            return empresaActualizadaRetorno;
      
    }

    async eliminar(
        clavePrimaria: EliminarEmpresasDto,
    ): Promise<RetornoEmpresasDto> {
        const empresa = await Empresas.findByPk(clavePrimaria.rut);

        if (!empresa) {
            throw new NotFoundException([
                `Empresa con rut ${clavePrimaria.rut} no encontrada`,
            ]);
        }


        try {
            
            await Empresas.update({ estado: ESTADOS.OPCION_2 }, { where: { rut: clavePrimaria.rut } });
        } catch (error) {
            
            await Empresas.sequelize.query(
                'UPDATE empresas SET estado = :estado WHERE rut = :rut',
                {
                    replacements: {
                        estado: ESTADOS.OPCION_2,
                        rut: clavePrimaria.rut,
                    },
                    type: QueryTypes.UPDATE,
                },
            );
        }



        const empresaEliminadaRetorno = (await Empresas.findOne({
            where: { rut: clavePrimaria.rut },
            attributes: { exclude: ['id_comunas'] },
            include: [
                {
                    model: Comunas,
                    as: 'comuna',
                    attributes: ['id', 'nombre'],
                },
                {
                    model: Giros,
                    as: 'giros',
                    attributes: [
                        'codigo',
                        'nombre',
                        'afecto_iva',
                        'nombre_categorias',
                    ],
                    through: { attributes: [] },
                },
                {
                    model: Contactos,
                    as: 'contactos',
                    attributes: ['email', 'nombre', 'cargo'],
                },
            ],
        })) as RetornoEmpresasDto;

        return empresaEliminadaRetorno;
    }
}
