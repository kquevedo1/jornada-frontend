import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    url = 'https://jornada-backend-wsb4.onrender.com/api/pacientes/';

    constructor(private http: HttpClient) { }

    //metodo get para obtener los pacientes
    getPacientes(): Observable<any> {
        return this.http.get(this.url);
    }

    //metodo para eliminar pacientes
    eliminarPaciente(id: string): Observable<any> {
        return this.http.delete(this.url + id);
    }

    //metodo para guardar pacientes
    guardarPaciente(patient: Patient): Observable<any> {
        return this.http.post(this.url, patient);
    }

    //metodo para obtener datos de los pacientes
    obtenerPaciente(id: string): Observable<any> {
        return this.http.get(this.url + id);
    }

    //metodo para editar pacientes
    editarPaciente(id: string, patient: Patient): Observable<any> {
        return this.http.put(this.url + id, patient);
    }

}
