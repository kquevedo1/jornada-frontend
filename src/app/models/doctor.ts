export class Doctor {
    _id?: number;
    nombredoctor: string;
    especialidad: string;
    estado:string;


    constructor(nombredoctor:string,especialidad:string,estado:string){
        this.nombredoctor=nombredoctor;
        this.especialidad=especialidad;
        this.estado=estado;
    }
    
}