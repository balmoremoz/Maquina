import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';
import {Moneda} from '../models/moneda.model';

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
  public getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`http://localhost:8080/maquina/venta/all`)
  }

  filtrarGanancias(fechaInicio:string, fechaFin:string):  Observable<any> {

    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.append('fechaInicio', fechaInicio);

    httpParams = httpParams.set("fechaFin", fechaFin);

    return this.http.get<any>(`http://localhost:8080/maquina/venta/filtrarGanancias`, {

      observe: 'body',

      params: httpParams

    });
  }
  filtrarVentas(fechaInicio:string, fechaFin:string):  Observable<any> {

    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.append('fechaInicio', fechaInicio);

    httpParams = httpParams.set("fechaFin", fechaFin);

    return this.http.get<any>(`http://localhost:8080/maquina/venta/filtrarVentas`, {

      observe: 'body',

      params: httpParams

    });
  }

}
