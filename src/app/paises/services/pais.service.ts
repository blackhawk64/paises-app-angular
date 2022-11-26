import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,population,cca2,flags');
  }

  constructor(private http: HttpClient) { }
  
  buscarPaises(termino: string, endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}/${termino}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }

  verInfoPaisCodigo(codigo: string): Observable<Pais> {
    const url = `${this.apiUrl}/alpha/${codigo}`;

    return this.http.get<Pais>(url);
  }
}
