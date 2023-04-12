import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoEntity } from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class productoService {
  private apiServerUrl ='http://localhost:8080/maquina';

  constructor(private http:HttpClient) { }

  public getProductos():Observable<ProductoEntity[]>{
    return this.http.get<ProductoEntity[]>(`${this.apiServerUrl}/producto/all`)
  }
  public getProductoById(productoId: number): Observable<ProductoEntity> {
    return this.http.get<ProductoEntity>(`http://localhost:8080/maquina/producto/find/${productoId}`);
  }
}