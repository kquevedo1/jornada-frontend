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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { 
    
  }

  ngOnInit(): void {
  }
   login() {
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (res) => {
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
        }
      },
      error: (err) => {
        this.errorMsg = err.error.msg;
      }
    });
  }


}


