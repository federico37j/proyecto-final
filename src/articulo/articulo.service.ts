import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imagen_articulo } from 'src/imagen-articulo/imagen-articulo.entity';
import { Equal, Repository } from 'typeorm';
import { Articulo } from './articulo.entity';

@Injectable()
export class ArticuloService {
    //private listadoArticulos: Promise<Articulo[]>;

    constructor(
        @InjectRepository(Articulo)
        private readonly articuloRepository: Repository<Articulo>,
        @InjectRepository(Imagen_articulo)
        private readonly imagenArticuloRepository: Repository<Imagen_articulo>
    ) {
        // this.listadoArticulos = this.getArticulos();
    }

    //Devuelve lista completa de artículos con sus respectivas imágenes.
    public async getArticulos(): Promise<Articulo[]> {
        try {
            const result = await this.articuloRepository.find({
                relations: ["imagen_articulo"]
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Devuelve lista de artículos.
    public async getAllArticulo(): Promise<Articulo[]> {
        try {
            let articulo: Articulo[] = await this.articuloRepository.find();
            return articulo;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }

    }

    // Devuelvo un id según la categoría que viene por parámetro.
    private categoriaStrigAid(categoria: string): number {
        let categoriaId: number = 0;
        switch (categoria.toLowerCase()) {
            case 'tecnologia':
                categoriaId = 1;
                break;

            case 'electrodomesticos':
                categoriaId = 2;
                break;

            case 'pequeños-electrodomesticos':
                categoriaId = 3;
                break;

            case 'hogar-y-jardin':
                categoriaId = 4;
                break;

            case 'deportes':
                categoriaId = 5;
                break;
        }
        return categoriaId;
    }


    public async getArticulosPorCategoria(categoria: number): Promise<Articulo[]> {
        try {
            const result = await this.articuloRepository.find({
                relations: ["imagen_articulo"],
                where: [
                    { "idCategoria": Equal(categoria) },

                ]
            });
            return result;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }


    // Devuelvo los artículos según la categoría.
    public getArticulosCategoria(categoria: string): Promise<Articulo[]> {
        return this.getArticulosPorCategoria(this.categoriaStrigAid(categoria));
    }

    // Devuelvo un artículo según el índex.
    public async getArticuloById(categoria: string, index: number): Promise<Articulo> {
        let response: Articulo = await this.articuloRepository.findOne({
            relations: ["imagen_articulo"],
            where: [{
                "idArticulo": Equal(index)
            }]
        })
        return response
    }

}
