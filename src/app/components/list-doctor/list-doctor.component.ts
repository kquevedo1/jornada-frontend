import { Component, OnInit } from '@angular/core';
// import { error } from 'console';
import { Toast, ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {
listDoctores: Doctor[] = [];

  constructor(private _doctorService: DoctorService,
    private toastr: ToastrService
  ) { }
//metodo principal oninitializer
  ngOnInit(): void {
    this.obtenerDoctores();
  }

  obtenerDoctores(){
    this._doctorService.getDoctores().subscribe(data => {
      console.log(data);
      this.listDoctores = data;
    }, error => {
      console.log(error);
    }
  )
  }

  eliminarDoctor(id: any){
    this._doctorService.eliminarDoctor(id).subscribe(data =>{
      this.toastr.error('Doctor eliminado con éxito', 'Doctor Eliminado');
      this.obtenerDoctores();
    }, error => {
      console.log(error);
    }
  )
  }

}
