import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @Get('')
    // getClientInfo(@Req() req: Request): { ip: string | string[]; url: string } {
    //     let clientIp =
    //         req.headers['x-forwarded-for'] ||
    //         req.ip ||
    //         req.connection.remoteAddress; // Captura la IP
    //     if (clientIp === '::1') {
    //         clientIp = '127.0.0.1';
    //     }
    //     const clientUrl = req.originalUrl; // Captura la URL solicitada
    //     return { ip: clientIp, url: clientUrl };
    // }

    @Get()
    getHello(@Param('key') claveApi: string ): string {

        console.log(claveApi);

        return this.appService.getHello();
    }
}
