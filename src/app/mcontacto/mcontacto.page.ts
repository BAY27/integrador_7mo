import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mcontacto',
  templateUrl: './mcontacto.page.html',
  styleUrls: ['./mcontacto.page.scss'],
})
export class McontactoPage implements OnInit {
contacto:any= [];
cod_contacto: string = "";
txt_nombre: string = "";
txt_apellido: string = "";
txt_telefono: string = "";
txt_email: string = "";
mensaje: string = "";
  constructor(public servicio:AccesoService, 
    public navCtrl: NavController) {
      this.servicio.getSession('cod_contacto').then((res:any)=>{
        this.cod_contacto=res;
        this.cargar_datos();
      });
    }

  ngOnInit() {
  }
  cargar_datos(){
    let datos={
      accion:"dcontacto",
      cod_contacto:this.cod_contacto
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado)
        {
        this.contacto=res.datos;
        this.txt_nombre=this.contacto.nombre;
        this.txt_apellido=this.contacto.apellido;
        this.txt_telefono=this.contacto.telefono;
        this.txt_email=this.contacto.email;
        }
        else
         {
        this.servicio.showToast(res.mensaje);       
         }
    });
   
  }
actualizar() {
let datos=
{
  accion:"acontacto",
  cod_contacto:this.cod_contacto,
  nombre:this.txt_nombre,
  apellido:this.txt_apellido,
  telefono:this.txt_telefono,
  email:this.txt_email,
};
this.servicio.postData(datos).subscribe((res:any)=>{
  if(res.estado)
    {
    this.servicio.showToast(res.mensaje);
    this.navCtrl.navigateRoot('/contacto');
    }
    else
     {
    this.servicio.showToast(res.mensaje);       
     }
});
}
cancelar() {
  this.navCtrl.navigateRoot('/contacto');
}
}
