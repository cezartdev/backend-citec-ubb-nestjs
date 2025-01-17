import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdenesDeTrabajosService {
    // async crear(empresa: CrearEmpresasDto): Promise<RetornoEmpresasDto> {
    //         // Ejecutar validaciones en paralelo
    //         const [empresaExistente, comuna, giros] = await Promise.all([
    //             Empresas.findOne({
    //                 where: { rut: empresa.rut },
    //                 attributes: ['rut'],
    //             }),
    //             Comunas.findOne({
    //                 where: { id: empresa.id_comunas },
    //                 attributes: ['id'],
    //             }),
    //             Giros.findAll({
    //                 where: { codigo: empresa.giros },
    //                 attributes: ['codigo'],
    //             }),
    //         ]);
    
    //         if (empresaExistente) {
    //             throw new ConflictException(['La empresa ya existe']);
    //         }
    
    //         if (!comuna) {
    //             throw new NotFoundException(['La comuna no existe']);
    //         }
    
        
    
    //         return empresaRetorno;
    //     }
}
