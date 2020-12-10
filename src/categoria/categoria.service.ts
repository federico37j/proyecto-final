import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/articulo/articulo.entity';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
        @InjectRepository(Articulo)
        private readonly articuloRepository: Repository<Articulo>
    ) { }

    public async getAll(): Promise<Categoria[]> {
        console.log("getAll de categorias")
        try {
            const result = await this.categoriaRepository.find({
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
        
    }
}


