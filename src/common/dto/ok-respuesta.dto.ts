import { ApiProperty } from '@nestjs/swagger';

export class OkRespuestaDto<Message, Response> {
    @ApiProperty({
        example: 'Mensaje de Exito',
    })
    readonly message: Message;

    @ApiProperty({})
    readonly response: Response;
}
