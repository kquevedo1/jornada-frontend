import { Component, OnInit } from '@angular/core';
// import { error } from 'console';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
listUsuarios: User[] = [];

  constructor(private _userService: UserService,
    private toastr: ToastrService
  ) { }
//metodo principal oninitializer
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._userService.getUsuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    }
  )
  }

  eliminarUsuario(id: any){
    this._userService.eliminarUsuario(id).subscribe(data =>{
      this.toastr.error('Usuario eliminado con éxito', 'Usuario Eliminado');
      this.obtenerUsuarios();
    }, error => {
      console.log(error);
    }
  )
  }
}
