import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonedaEntity } from '../models/moneda.model';


@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private apiServerUrl = 'http://localhost:8080/maquina/moneda';

  constructor(private http: HttpClient) { }

  public getMonedas(): Observable<MonedaEntity[]> {
    return this.http.get<MonedaEntity[]>(`${this.apiServerUrl}/all`)
  }

}
