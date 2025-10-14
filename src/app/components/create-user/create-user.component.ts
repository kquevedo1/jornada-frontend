import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
userForm: FormGroup;
  tituloUsuario= 'Crear Usuario';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private aRouter: ActivatedRoute) {
            
    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      tipopermiso: ['', Validators.required],
      contrasena: ['', Validators.required],
      estadousuario: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.esEditarUsuario();
  }
//metodo para agregar usuario
  agregarUsuario(){
  const USUARIO: User ={
    usuario: this.userForm.get('usuario')?.value,
    tipopermiso: this.userForm.get('tipopermiso')?.value,
    contrasena:this.userForm.get('contrasena')?.value,
    estadousuario:this.userForm.get('estadousuario')?.value,
  }
  if(this.id !== null){
    //editamos usuario
    this._userService.editarUsuario(this.id, USUARIO).subscribe(data =>{
      this.toastr.info('El usuario fue actualizado con éxito!', 'Usuario actualizado'); //puedo agregarle success en vez de info
      this.router.navigate(['/users']);
    },error =>{
      console.log(error);
      this.userForm.reset();
    }
  )

  }else {
    //agregamos usuario
    console.log(USUARIO);
    this._userService.guardarUsuario(USUARIO).subscribe(data =>{
      this.toastr.success('El usuario fue registrado con éxito!', 'Usuario registrado'); //puedo agregarle success en vez de info
      this.router.navigate(['/users']);
    }, error =>{
      console.log(error);
      this.userForm.reset();
    })
  }
  
  }

  //metodo para editar
  esEditarUsuario(){
    if(this.id !== null){
      this.tituloUsuario = 'Editar Usuario';
      this._userService.obtenerUsuario(this.id).subscribe(data =>{
        this.userForm.setValue({
          usuario: data.usuario,
          tipopermiso: data.tipopermiso,
          contrasena: data.contrasena,
          estadousuario: data.estadousuario,
        })
      })
    }
  }
}
