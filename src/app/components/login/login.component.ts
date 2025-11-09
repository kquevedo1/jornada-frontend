import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  errorMsg: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void { }
  login() {
    this.errorMsg = '';
    this.cargando = true;

    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (res) => {
        this.cargando = false; 

        const rol = res.rol;
        // redirigir según el rol
        if (rol === 'SuperAdmin') {
          this.router.navigate(['/home']);
        } else if (rol === 'Administrador') {
          this.router.navigate(['/list-doctor']);
        } else if (rol === 'PermisoDoctor') {
          this.router.navigate(['/list-patient']);
        } else if (rol === 'PermisoGeneral') {
          this.router.navigate(['/create-patient']);
        }else if (rol ==='PermisoFarmacia'){
            this.router.navigate(['/list-patient']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = err.error.msg ||'Error al iniciar sesión';
      }
    });
  }
}


