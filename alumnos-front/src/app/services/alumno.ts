import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private readonly apiUrl =
    'https://probable-zebra-pj9pw7w4g7pq3rg79-8080.app.github.dev/api/alumnos';

  // HttpClient es la herramienta de Angular para llamar a la API
  constructor(private http: HttpClient) {}

  listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
