import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService { 

  fechaInicio:string="";
  fechaFin:string="";

  constructor(private http: HttpClient) { }

  anadirVenta(productoId: number, dinero: number): Observable<any> {

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

  filtrarGanancias(fechaInicio: string, fechaFin: string): Observable<any> {

    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.append('fechaInicio', fechaInicio);

    httpParams = httpParams.set("fechaFin", fechaFin);

    return this.http.get<any>(`http://localhost:8080/maquina/venta/filtrarGanancias`, {

      observe: 'body',

      params: httpParams

    });
  }
  filtrarVentas(fechaInicio: string, fechaFin: string): Observable<any> {

    let httpParams: HttpParams = new HttpParams();
    if ((fechaInicio == "")&&(fechaFin != "")) {
      httpParams = httpParams.set("fechaFin", fechaFin);
    }

    if ((fechaFin == "")&&(fechaInicio != "") ){
      httpParams = httpParams.set('fechaInicio', fechaInicio);
    }
    if ((fechaInicio != "") && (fechaFin != "")) {
      httpParams = httpParams.set('fechaInicio', fechaInicio);
      httpParams = httpParams.set('fechaFin', fechaFin);
    }
    this.fechaInicio=fechaInicio;
    this.fechaFin=fechaFin;

    return this.http.get<any>(`http://localhost:8080/maquina/venta/filtrarVentas`, {

      observe: 'body',

      params: httpParams
  
    });
  }

  descargarInforme():Observable<any>{
    let httpParams: HttpParams = new HttpParams();

    if ((this.fechaInicio == "")&&(this.fechaFin != "")) {
      httpParams = httpParams.set("fechaFin", this.fechaFin);
    }

    if ((this.fechaFin == "")&&(this.fechaInicio != "") ){
      httpParams = httpParams.set('fechaInicio', this.fechaInicio);
    }
    if ((this.fechaInicio != "") && (this.fechaFin != "")) {
      httpParams = httpParams.set('fechaInicio', this.fechaInicio);
      httpParams = httpParams.set('fechaFin', this.fechaFin);
    }

    return this.http.get<any>(`http://localhost:8080/maquina/venta/descargar`, {

      observe: 'body',

      params: httpParams,

      responseType:'blob' as 'json'

    });
  }

}
