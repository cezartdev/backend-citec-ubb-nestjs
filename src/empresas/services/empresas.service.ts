import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CrearEmpresasDto, RetornoEmpresasDto } from '../dtos/empresas.dto';
import { Empresas } from '../../database/models/empresas.model';
import { Comunas } from '../../database/models/comunas.model';
import { Giros } from '../../database/models/giros.model';
import { Contactos } from '../../database/models/contactos.model';
import { Estados, ESTADOS } from '../../common/constants/estados.constants';

@Injectable()
export class EmpresasService {
    async crear(empresa: CrearEmpresasDto) : Promise<RetornoEmpresasDto> {
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
            const girosEncontrados = giros.map(g => g.codigo);
            const girosFaltantes = empresa.giros.filter(g => !girosEncontrados.includes(g));
            
            throw new NotFoundException([`Los siguientes codigos de giros no existen: ${girosFaltantes.join(', ')}`]);
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
        
        await Promise.all(
            empresa.contactos.map(async (contacto) => {
                await Contactos.create({
                    email: contacto.email,
                    nombre: contacto.nombre,
                    cargo: contacto.cargo,
                    rut_empresas: empresaCreada.rut
                });
                
            })
        );

        // Obtener la empresa con las relaciones incluídas
        const empresaRetorno = await Empresas.findOne({
            where: { rut: empresaCreada.rut },
            attributes:{
                exclude:['id_comunas'],
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
                    attributes: ['codigo', 'nombre', 'afecto_iva', 'nombre_categorias'],
                    through: {attributes: []}
                },
                {
                    model: Contactos,
                    as: 'contactos',
                    attributes: ['email', 'nombre', 'cargo'],
                },
            ],
        }) as RetornoEmpresasDto;
        

        return empresaRetorno;
    }
}
