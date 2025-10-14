import { Component, OnInit } from '@angular/core';
// import { error } from 'console';
import { Toast, ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/patient';
import{PatientService}  from 'src/app/services/patient.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {
listPacientes: Patient[] = [];
// filtros
filtroEspecialidad: string = '';
filtroEstado: string = '';
especialidades: string[] = [];

  constructor(private _pacienteService: PatientService,
      private toastr: ToastrService
    ) { }
//metodo principal oninitializer
  ngOnInit(): void {
    this.obtenerPacientes();
  }

  obtenerPacientes(){
    this._pacienteService.getPacientes().subscribe(data => {
      console.log(data);
      this.listPacientes = data;
      // linea agregada para el filtro
        this.especialidades = [...new Set(this.listPacientes.map(p => p.especialidadpaciente))];
    }, error => {
      console.log(error);
    }
  )
  }

  eliminarPaciente(id: any){
    this._pacienteService.eliminarPaciente(id).subscribe(data =>{
      this.toastr.error('Paciente eliminado con éxito', 'Paciente Eliminado');
      this.obtenerPacientes();
    }, error => {
      console.log(error);
    }
  )
  }

  //metodo de filtro
  pacientesFiltrados(): Patient[] {
  return this.listPacientes.filter(paciente => {
    const coincideEspecialidad = this.filtroEspecialidad === '' 
      || paciente.especialidadpaciente === this.filtroEspecialidad;

    const coincideEstado = this.filtroEstado === '' 
      || paciente.estadopaciente === this.filtroEstado;

    return coincideEspecialidad && coincideEstado;
  });
}


}
