import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/categoria.entity';
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
        private readonly imagenArticuloRepository: Repository<Imagen_articulo>,
        @InjectRepository(Categoria)
        private readonly categoriaArticuloRepository: Repository<Imagen_articulo>
    ) {
        // this.listadoArticulos = this.getArticulos();
    }

    //Creo un artículo con los datos que vienen por parámetro.
    public async addArticulo(newArticulo: any, categoria: string): Promise<Articulo> {
        try {
            const articuloCreado: Articulo = await this.articuloRepository.save(new Articulo(
                newArticulo.nombre,
                Number(newArticulo.precio),
                newArticulo.financiacion,
                newArticulo.detalle,
                newArticulo.tipo,
                Number(newArticulo.stock),
                this.categoriaStrigAid(categoria)
            )
            );
            if (articuloCreado) {
                //Si el artículo se creó, hago lo mismo con las imágenes.
                this.addImagen(newArticulo.imagen_articulo, articuloCreado.getNroArticulo())
                return articuloCreado;
            } else {
                throw new HttpException('No se pudo crear un articulo', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    public async addImagen(newImagenes: any[], nroArticulo: number) {
        try {
            //let arrImagenes: Promise<Imagen_articulo[]>;
            for (let i = 0; i < newImagenes.length; i++) {
                let principal;
                if (i == 0) {
                    principal = true;
                } else {
                    principal = false;
                }
                const imgCreada: Imagen_articulo = await this.imagenArticuloRepository.save(new Imagen_articulo(
                    newImagenes[i],
                    principal,
                    nroArticulo
                ));
                // (await arrImagenes).push(imgCreada);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
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

    // Devuelvo un artículo según el id.
    public async getArticuloById(id: number): Promise<Articulo> {
        try {
            let response: Articulo = await this.articuloRepository.findOne({
                relations: ["imagen_articulo"],
                where: [{
                    "idArticulo": Equal(id)
                }]
            })
            return response;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    // Devuelvo las imagenes pertenecientes a ese id_articulo
    public async getImagenesByIdArticulo(id: number): Promise<Imagen_articulo[]> {
        try {
            let response: Imagen_articulo[] = await this.imagenArticuloRepository.find({
                where: [{
                    "idArticulo": Equal(id)
                }]
            })
            return response;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Me traigo desde la bd el artículo con ese id, si existe con los sets lo modifico.
    public async updateArticulo(updateArticulo: any, categoria: string, id: number): Promise<Articulo> {
        let articulo: Articulo = await this.getArticuloById(id);
        try {
            if (articulo) {
                articulo.setNombre(updateArticulo.nombre);
                articulo.setPrecio(updateArticulo.precio);
                articulo.setFinanciacion(updateArticulo.financiacion);
                articulo.setDetalle(updateArticulo.detalle);
                articulo.setTipo(updateArticulo.tipo);
                articulo.setStock(updateArticulo.stock);
                const articuloUpdated: Articulo = await this.articuloRepository.save(articulo);

                if (articuloUpdated) {
                    //Si el artículo se actualizo, hago lo mismo con las imágenes.
                    this.updateImagen(updateArticulo.imagenes, articulo.getNroArticulo());
                    return articulo;
                } else {
                    throw new HttpException('No se pudo crear el artículo', HttpStatus.NOT_MODIFIED);
                }
            } else {
                throw new HttpException('No se pudo crear el artículo', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }


    //Actualizo las imágenes actuales y me fijo si hay imágenes nuevas para cargar en el caso que tenga llamo a la función addImagen.
    public async updateImagen(newImagenes: any[], nroArticulo: number) {
        let imagenes: Imagen_articulo[] = await this.getImagenesByIdArticulo(nroArticulo);
        try {
            if (imagenes) {
                for (let i = 0; i < imagenes.length; i++) {
                    imagenes[i].setImagen(newImagenes[i]);
                    const imagenesUpdated: Imagen_articulo = await this.imagenArticuloRepository.save(imagenes[i]);
                    if (imagenesUpdated) {
                    }
                }
                if (newImagenes.length !== imagenes.length) {
                    let imgNuevas: string[] = []
                    for (let i = imagenes.length; i < newImagenes.length; i++) {
                        imgNuevas.push(newImagenes[i])
                    }
                    this.addImagen(imgNuevas, nroArticulo);
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Elimino todas las imagenes que esten relacionadas con ese id de artículo.
    public async deleteImagenes(id: number) {
        try {
            await this.imagenArticuloRepository.query(`DELETE FROM IMAGEN_ARTICULO WHERE idArticulo = ${id}`);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }

    //Me traigo desde la bd el artículo con ese id, si existe elimino primero las imagenes que tiene referenciadas y despues elimino el artículo.
    public async deleteArticulo(id: number): Promise<boolean> {
        try {
            let articulo = await this.getArticuloById(id);
            if (articulo) {
                await this.deleteImagenes(id);
                let deletResult = await this.articuloRepository.delete(id);
                if (deletResult.affected) {
                    console.log("Elemento eliminado");
                    return true;
                }
            } else {
                throw new HttpException('No se pudo eliminar el artículo', HttpStatus.NOT_MODIFIED);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }

    }

    public async updateStock(cantidadComprada: any, id: number): Promise<Articulo> {
        let articulo: Articulo = await this.getArticuloById(id);
        try {
            if (articulo) {
                let stockReal = articulo.getStock() - cantidadComprada.cantidad;
                articulo.setStock(stockReal);
                const articuloUpdated: Articulo = await this.articuloRepository.save(articulo);
                return articulo;
            } else {
                throw new HttpException('No se pudo crear el artículo', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
