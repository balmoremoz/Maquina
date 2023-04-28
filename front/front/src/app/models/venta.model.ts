import { ProductoEntity } from "./producto.model";

export interface VentaEntity{
    id:number;
    fecha:string;
    idProducto:number;
    dineroIngresado:number;
    producto:ProductoEntity;
}