import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import * as bootstrap from 'bootstrap'; // Importa Bootstrap

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {
  listDoctores: Doctor[] = [];
  private idDoctorEliminar: string = ''; // id temporal
  private modalRef: any; // referencia al modal

  constructor(private _doctorService: DoctorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerDoctores();
  }

  obtenerDoctores() {
    this._doctorService.getDoctores().subscribe({
      next: data => (this.listDoctores = data),
      error: err => console.log(err)
    });
  }

  // Abrir modal de confirmación
  abrirModal(id: string) {
    this.idDoctorEliminar = id;
    const modalElement = document.getElementById('confirmModalDoctor');
    if (modalElement) {
      this.modalRef = new bootstrap.Modal(modalElement);
      this.modalRef.show();
    }
  }

  // Confirmar eliminación
  confirmarEliminar() {
    if (!this.idDoctorEliminar) return;

    this._doctorService.eliminarDoctor(this.idDoctorEliminar).subscribe({
      next: data => {
        this.toastr.error('Doctor eliminado con éxito', 'Doctor Eliminado');
        this.obtenerDoctores();
        this.modalRef.hide(); // cerrar modal
      },
      error: err => {
        console.log(err);
        this.toastr.error('Error al eliminar el doctor', 'Error');
        this.modalRef.hide();
      }
    });
  }
}