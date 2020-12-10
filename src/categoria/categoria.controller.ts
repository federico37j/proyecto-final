import { Controller, Get } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
    public constructor(private readonly categoriaService: CategoriaService) { }

    @Get('get_all')
    public getAll(): Promise<Categoria[]>{
        return this.categoriaService.getAll();
    }
}