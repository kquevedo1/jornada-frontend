export class User {
    _id?: number;
    usuario: string;
    tipopermiso: string;
    contrasena: string;
    estadousuario:string;


    constructor(usuario:string,contrasena:string,tipopermiso:string,estadousuario:string){
        this.usuario=usuario;
        this.tipopermiso=tipopermiso;
        this.contrasena=contrasena;
        this.estadousuario=estadousuario;
    }
    
}