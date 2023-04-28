import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VentaEntity } from '../models/venta.model';
import { MonedaEntity } from '../models/moneda.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  anadirVenta(productoId: number, dinero: number):  Observable<any> {

    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.append('productoId', productoId);

    httpParams = httpParams.set("dinero", dinero);

    return this.http.get<any>(`http://localhost:8080/maquina/venta/nueva`, {

      observe: 'body',

      params: httpParams

    });
  }
  public getVentas(): Observable<VentaEntity[]> {
    return this.http.get<VentaEntity[]>(`http://localhost:8080/maquina/venta/all`)
  }


}
