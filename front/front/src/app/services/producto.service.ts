import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoEntity } from '../models/producto.model';
import { MonedaEntity } from '../models/moneda.model';

@Injectable({
  providedIn: 'root'
})
export class productoService {
  private apiServerUrl = 'http://localhost:8080/maquina';

  constructor(private http: HttpClient) { }

  public getProductos(): Observable<ProductoEntity[]> {
    return this.http.get<ProductoEntity[]>(`${this.apiServerUrl}/producto/all`)
  }

  public getMonedasyProducto(monedas, productoId: string): Observable<MonedaEntity[]> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.append('monedas', monedas);
    httpParams = httpParams.set("productoPosicion", productoId);

    return this.http.get<MonedaEntity[]>(`${this.apiServerUrl}/moneda/compra`, {

      observe: 'body',
      params: httpParams,

    });
  }

  public anadirProducto(posicion: string, cantidad: number): Observable<string> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.set('posicion', posicion);
    httpParams = httpParams.set('cantidad', cantidad);
    console.log(httpParams);

    return this.http.get<string>(`${this.apiServerUrl}/producto/anadir`, {
      observe: 'body',
      params: httpParams,
    });
  }

  public anadirMoneda(valor: number, cantidad: number): Observable<string> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.set('valor', valor);
    httpParams = httpParams.set('cantidad', cantidad);
    console.log(httpParams);

    return this.http.get<string>(`${this.apiServerUrl}/moneda/anadir`, {
      observe: 'body',
      params: httpParams,    
    });
  }
  public getProductoByPosicion(posicion:string): Observable<ProductoEntity> {
    return this.http.get<ProductoEntity>(`${this.apiServerUrl}/producto/find/${posicion}`)
  }


}