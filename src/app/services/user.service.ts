import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4000/api/usuarios/';

  constructor(private http: HttpClient) { }

  //metodo get para obtener los usuarios
  getUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

  //metodo para eliminar usuarios
  eliminarUsuario(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  //metodo para guardar usuario
  guardarUsuario(user: User): Observable<any>{
    return this.http.post(this.url, user);
  }

  //metodo para obtener datos del usuario
  obtenerUsuario(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  //metodo para editar usuario
  editarUsuario(id: string, user: User): Observable<any>{
    return this.http.put(this.url + id, user);
  }
  
}
