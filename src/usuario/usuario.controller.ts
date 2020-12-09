import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioDTO } from './usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    public constructor(private readonly usuarioService: UsuarioService) { }

    @Post('nuevo_usuario')
    public createCliente(@Body() newUsuario: UsuarioDTO): Promise<Usuario> {
        return this.usuarioService.addCliente(newUsuario);
    }

    @Get(':email')
    public getUsuarioByEmail(@Param('email') email:string): Promise<Usuario> {
        return this.usuarioService.getUsuarioByEmail(email);
    }

}
