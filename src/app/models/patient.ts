export class Patient {
    _id?: number;
    nombrepaciente: string;
    edad: number;
    especialidadpaciente:string;
    sexo: string;
    profesion: string;
    religion: string;
    escolaridad: string;
    telefono: number;
    duenotelefono: string;
    mediocontacto: string;
    etnia: string;
    ambientecasa: string[];
    piso: string;
    pared: string;
    techo: string;
    sanitario: string;
    agua: string;
    basura: string;
    dispocionexcretas: string;
    estadopaciente: string;


    constructor(
    nombrepaciente: string,
    edad: number,
    especialidadpaciente:string,
    sexo: string,
    profesion: string,
    religion: string,
    escolaridad: string,
    telefono: number,
    duenotelefono: string,
    mediocontacto:string,
    etnia: string,
    ambientecasa: string[],
    piso: string,
    pared: string,
    techo: string,
    sanitario: string,
    agua: string,
    basura: string,
    dispocionexcretas: string,
    estadopaciente: string,
    ){
        this.nombrepaciente=nombrepaciente;
        this.edad=edad;
        this.especialidadpaciente=especialidadpaciente;
        this.sexo=sexo;
        this.profesion=profesion;
        this.religion=religion;
        this.escolaridad=escolaridad;
        this.telefono=telefono;
        this.duenotelefono=duenotelefono;
        this.mediocontacto=mediocontacto;
        this.etnia=etnia;
        this.ambientecasa=ambientecasa;
        this.piso=piso;
        this.pared=pared;
        this.techo=techo;
        this.sanitario=sanitario;
        this.agua=agua;
        this.basura=basura;
        this.dispocionexcretas=dispocionexcretas;
        this.estadopaciente=estadopaciente;
    }
}