import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) {}
    getHello(): string {
        const apiKey = this.configService.apiKey;
        const url = this.configService.database.url;
        return `Hello World!<br/> API_KEY: ${apiKey}<br/> DATABASE_URL: ${url}`;
    }

    /**
     * Este metodo se encarga de guardar los logs de la aplicacion
     */
    logs(){

    }

    /**
     * 
     */
    obtenerClave(){
        
    }


}
