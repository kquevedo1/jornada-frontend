import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as bootstrap from 'bootstrap'; //  Importa Bootstrap

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listUsuarios: User[] = [];
  private idUsuarioEliminar: string = ''; //  guardará el id temporalmente
  private modalRef: any; // referencia al modal

  constructor(private _userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._userService.getUsuarios().subscribe({
      next: data => (this.listUsuarios = data),
      error: err => console.log(err)
    });
  }

  //  Abre el modal de confirmación
  abrirModal(id: string) {
    this.idUsuarioEliminar = id;
    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      this.modalRef = new bootstrap.Modal(modalElement);
      this.modalRef.show();
    }
  }

  //  Confirma la eliminación
  confirmarEliminar() {
    if (!this.idUsuarioEliminar) return;

    this._userService.eliminarUsuario(this.idUsuarioEliminar).subscribe({
      next: data => {
        this.toastr.error('Usuario eliminado con éxito', 'Usuario Eliminado');
        this.obtenerUsuarios();
        this.modalRef.hide(); // cierra el modal
      },
      error: err => {
        console.log(err);
        this.toastr.error('Error al eliminar el usuario', 'Error');
        this.modalRef.hide();
      }
    });
  }
}
