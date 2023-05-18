import { Producto } from "./producto.model";

export interface Venta{
    id:number;
    fecha:string;
    idProducto:number;
    dineroIngresado:number;
    producto:Producto;
}