import { Controller } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    public constructor(private readonly usuarioService: UsuarioService) { }
}
