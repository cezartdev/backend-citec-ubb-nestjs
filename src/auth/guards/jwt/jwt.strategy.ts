import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT,
    });
  }
  //TODO: Implementar el tipo de dato de retorno
  async validate(payload: any) {
    // console.log('Payload', payload); //Payload { nombre: 'ADMINISTRADOR', 'contraseña': '1234567890' }
    
    return this.usuariosService.obtenerPorId(payload);  // Devuelve el usuario asociado al payload
  }
}