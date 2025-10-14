import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  url = 'http://localhost:4000/api/doctores/';

  constructor(private http: HttpClient) { }

  //metodo get para obtener los doctores
  getDoctores(): Observable<any>{
    return this.http.get(this.url);
  }

  //metodo para eliminar doctores
  eliminarDoctor(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  //metodo para guardar doctor
  guardarDoctor(doctor: Doctor): Observable<any>{
    return this.http.post(this.url, doctor);
  }

  //metodo para obtener datos del doctor
  obtenerDoctor(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  //metodo para editar doctor
  editarDoctor(id: string, doctor: Doctor): Observable<any>{
    return this.http.put(this.url + id, doctor);
  }
  
}
