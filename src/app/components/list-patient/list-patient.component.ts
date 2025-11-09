import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {
  listPacientes: Patient[] = [];

  // Filtros
  filtroEspecialidad: string = '';
  filtroEstado: string = '';
  filtroMedicamento: string = '';
  especialidades: string[] = [];

  // Modal
  private idPacienteEliminar: string = '';
  private modalRef: any;

  constructor(private _pacienteService: PatientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes() {
    this._pacienteService.getPacientes().subscribe({
      next: data => {
        this.listPacientes = data;
        this.especialidades = [...new Set(this.listPacientes.map(p => p.especialidadpaciente))];
      },
      error: err => console.log(err)
    });
  }

  // Abre el modal de confirmación
  abrirModal(id: string) {
    this.idPacienteEliminar = id;
    const modalElement = document.getElementById('confirmModalPaciente');
    if (modalElement) {
      this.modalRef = new bootstrap.Modal(modalElement);
      this.modalRef.show();
    }
  }

  // Confirmar eliminación
  confirmarEliminar() {
    if (!this.idPacienteEliminar) return;

    this._pacienteService.eliminarPaciente(this.idPacienteEliminar).subscribe({
      next: data => {
        this.toastr.error('Paciente eliminado con éxito', 'Paciente Eliminado');
        this.obtenerPacientes();
        this.modalRef.hide();
      },
      error: err => {
        console.log(err);
        this.toastr.error('Error al eliminar el paciente', 'Error');
        this.modalRef.hide();
      }
    });
  }

  //  Filtro de pacientes
  pacientesFiltrados(): Patient[] {
    return this.listPacientes.filter(paciente => {
      const coincideEspecialidad =
        this.filtroEspecialidad === '' || paciente.especialidadpaciente === this.filtroEspecialidad;

      const coincideEstado = this.filtroEstado === '' || paciente.estadopaciente === this.filtroEstado;

      const coincideMedicamento =
        this.filtroMedicamento === '' || paciente.entregamedicina === this.filtroMedicamento;

      return coincideEspecialidad && coincideEstado && coincideMedicamento;
    });
  }
}
