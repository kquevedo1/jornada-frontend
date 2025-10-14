import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';



@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  doctorForm: FormGroup;
  tituloDoctor = 'Crear Doctor';
  id: string | null;

  constructor(private fb: FormBuilder,
      private router: Router,
      private toastr: ToastrService,
      private _doctorService: DoctorService,
      private aRouter: ActivatedRoute) { 

    this.doctorForm = this.fb.group({
      nombredoctor: ['', Validators.required],
      especialidad: ['', Validators.required],
      estado: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditarDoctor();
  }
//metodo para agregar doctor
  agregarDoctor(){
  const DOCTOR: Doctor ={
    nombredoctor: this.doctorForm.get('nombredoctor')?.value,
    especialidad:this.doctorForm.get('especialidad')?.value,
    estado:this.doctorForm.get('estado')?.value,
  }
  if(this.id !== null){
    //editamos doctor
    this._doctorService.editarDoctor(this.id, DOCTOR).subscribe(data =>{
      this.toastr.info('El doctor fue actualizado con éxito!', 'Doctor actualizado'); //puedo agregarle success en vez de info
      this.router.navigate(['/list-doctor']);
    },error =>{
      console.log(error);
      this.doctorForm.reset();
    }
  )

  }else {
    //agregamos doctor
    console.log(DOCTOR);
    this._doctorService.guardarDoctor(DOCTOR).subscribe(data =>{
      this.toastr.success('El doctor fue registrado con éxito!', 'Doctor registrado'); //puedo agregarle success en vez de info
      this.router.navigate(['/list-doctor']);
    }, error =>{
      console.log(error);
      this.doctorForm.reset();
    })
  }
  
  }

  //metodo para editar
  esEditarDoctor(){
    if(this.id !== null){
      this.tituloDoctor = 'Editar Doctor';
      this._doctorService.obtenerDoctor(this.id).subscribe(data =>{
        this.doctorForm.setValue({
          nombredoctor: data.nombredoctor,
          especialidad: data.especialidad,
          estado: data.estado,
        })
      })
    }
  }

}
