export class Articulo {
    private id_articulo: number;
    private fk_categoria: number;
    private nombre: string;
    private precio: number;
    private financiacion: string;
    private detalle: string;
    private tipo: string;
    private stock: number;
    private imagenes: string[];

    public constructor(id: number, fk_categoria: number, nombre: string, precio: number, financiacion: string, 
        detalle: string, tipo: string, stock: number, imagenes: string[]) {
        this.id_articulo = id;
        this.fk_categoria = fk_categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.financiacion = financiacion;
        this.detalle = detalle;
        this.tipo = tipo;
        this.stock = stock;
        this.imagenes = imagenes;
    }

    public getId(): number {
        return this.id_articulo;
    }

    public getFkCategoria(): number {
        return this.fk_categoria;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getDetalle(): string {
        return this.detalle;
    }

    public getFinanciacion(): string {
        return this.financiacion;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getStock(): number {
        return this.stock;
    }

    public getImagen(): string[] {
        return this.imagenes;
    }
}
