import { Estados } from "src/common/constants/estados.constants";
import { TiposDeUsuario } from "src/common/constants/tipos-usuarios.constants";

export class UsuariosEntidad {
    email: string;
    nombre: string;
    apellido: string;
    contraseña: string;
    estado: Estados;
    nombre_tipos: TiposDeUsuario;
    createdAt: Date;
    updatedAt: Date;
}
