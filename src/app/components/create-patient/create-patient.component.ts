import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  patientForm: FormGroup;
  tituloPatient = 'Crear Paciente';
  id: string | null;

  ambientesCasa = ['Dormitorios', 'Cocina', 'Sala', 'Comedor', 'Baños', 'Otros'];
  ambientesCasaSeleccionados: string[] = [];


  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _patientService: PatientService,
    private aRouter: ActivatedRoute) {

    this.patientForm = this.fb.group({
      nombrepaciente: ['', Validators.required],
      edad: ['', Validators.required],
      especialidadpaciente: ['', Validators.required],
      sexo: ['', Validators.required],
      profesion: ['', Validators.required],
      religion: ['', Validators.required],
      escolaridad: ['', Validators.required],
      telefono: ['', Validators.required],
      duenotelefono: ['', Validators.required],
      mediocontacto: ['', Validators.required],
      etnia: ['', Validators.required],
      ambientecasa: this.fb.array([], Validators.required),
      piso: ['', Validators.required],
      pared: ['', Validators.required],
      techo: ['', Validators.required],
      sanitario: ['', Validators.required],
      agua: ['', Validators.required],
      basura: ['', Validators.required],
      dispocionexcretas: ['', Validators.required],
      observaciones:[''],
      tratamiento:[''],
      entregamedicina: ['', Validators.required],
      estadopaciente: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  //metodo para array ambiente casa
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.patientForm.get('ambientecasa') as FormArray;

    if (e.target.checked) {
      checkArray.push(this.fb.control(e.target.value));
    } else {
      const index = checkArray.controls.findIndex((x: any) => x.value === e.target.value);
    if (index !== -1) {
      checkArray.removeAt(index);
    }
    }
  }

  ngOnInit(): void {
    this.esEditarPaciente();
  }
  //metodo para agregar paciente
  agregarPaciente() {
    const PACIENTE: Patient = {
      nombrepaciente: this.patientForm.get('nombrepaciente')?.value,
      edad: this.patientForm.get('edad')?.value,
      especialidadpaciente: this.patientForm.get('especialidadpaciente')?.value,
      sexo: this.patientForm.get('sexo')?.value,
      profesion: this.patientForm.get('profesion')?.value,
      religion: this.patientForm.get('religion')?.value,
      escolaridad: this.patientForm.get('escolaridad')?.value,
      telefono: this.patientForm.get('telefono')?.value,
      duenotelefono: this.patientForm.get('duenotelefono')?.value,
      mediocontacto: this.patientForm.get('mediocontacto')?.value,
      etnia: this.patientForm.get('etnia')?.value,
      ambientecasa: this.patientForm.get('ambientecasa')?.value,
      piso: this.patientForm.get('piso')?.value,
      pared: this.patientForm.get('pared')?.value,
      techo: this.patientForm.get('techo')?.value,
      sanitario: this.patientForm.get('sanitario')?.value,
      agua: this.patientForm.get('agua')?.value,
      basura: this.patientForm.get('basura')?.value,
      dispocionexcretas: this.patientForm.get('dispocionexcretas')?.value,
      observaciones: this.patientForm.get('observaciones')?.value,
      tratamiento: this.patientForm.get('tratamiento')?.value,
      entregamedicina:this.patientForm.get('entregamedicina')?.value,
      estadopaciente: this.patientForm.get('estadopaciente')?.value,
    }
    if (this.id !== null) {
      //editamos paciente
      this._patientService.editarPaciente(this.id, PACIENTE).subscribe(data => {
        this.toastr.success('El paciente fue actualizado con éxito!', 'Paciente actualizado'); //puedo agregarle success en vez de info
        this.router.navigate(['/list-patient']);
      }, error => {
        console.log(error);
        this.patientForm.reset();
      }
      )

    } else {
      //agregamos paciente
      console.log(PACIENTE);
      this._patientService.guardarPaciente(PACIENTE).subscribe(data => {
        this.toastr.success('El paciente fue registrado con éxito!', 'Paciente registrado'); //puedo agregarle success en vez de info
        this.router.navigate(['/list-patient']);
      }, error => {
        console.log(error);
        this.patientForm.reset();
      })
    }

  }

  //metodo para editar
  esEditarPaciente() {
    if (this.id !== null) {
      this.tituloPatient = 'Editar Paciente';
      this._patientService.obtenerPaciente(this.id).subscribe(data => {
        this.patientForm.patchValue({
          nombrepaciente: data.nombrepaciente,
          edad: data.edad,
          especialidadpaciente: data.especialidadpaciente,
          sexo: data.sexo?.trim(),
          profesion: data.profesion,
          religion: data.religion,
          escolaridad: data.escolaridad?.trim(),
          telefono: data.telefono,
          duenotelefono: data.duenotelefono,
          mediocontacto: data.mediocontacto?.trim(),
          etnia: data.etnia?.trim(),
          piso: data.piso?.trim(),
          pared: data.pared,
          techo: data.techo,
          sanitario: data.sanitario,
          agua: data.agua,
          basura: data.basura,
          dispocionexcretas: data.dispocionexcretas,
          observaciones:data.observaciones,
          tratamiento:data.tratamiento,
          entregamedicina:data.entregamedicina?.trim(),
          estadopaciente: data.estadopaciente?.trim(),
        });
        const checkArray = this.patientForm.get('ambientecasa') as FormArray;
        this.ambientesCasaSeleccionados = data.ambientecasa || [];

        this.ambientesCasaSeleccionados.forEach((item: string) => {
          checkArray.push(this.fb.control(item));

        });
      });

    }
  }
}