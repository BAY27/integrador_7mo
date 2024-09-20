import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {
contactos:any=[];
cod_persona:string="";
  constructor(public navCtrl: NavController,
              public servicio:AccesoService
  ) 
  { 
    this.servicio.getSession('cod_persona').then((res:any)=>{
    this.cod_persona=res;
    this.lcontactos();
    });
  }

  ngOnInit() {
  }
lcontactos(){
  let datos={
    "accion":"lcontactos",
    "codigo":this.cod_persona
  };
  this.servicio.postData(datos).subscribe((res:any)=>{
    if(res.estado==true){
      this.contactos=res.contactos;
      }
      else
      {
      this.servicio.showToast(res.mensaje);       
      }
  });
}
nuevo()
{
this.navCtrl.navigateRoot(['contacto']);
}
editar(cod_contacto:string)
{
  this.navCtrl.navigateRoot(['mcontacto']);
  this.servicio.createSession('cod_contacto',cod_contacto);
//this.navCtrl.navigateForward(['contacto',cod_contacto])
}
eliminar(cod_contacto:string)
{
  this.navCtrl.navigateRoot(['econtacto']);
  this.servicio.createSession('cod_contacto',cod_contacto);
}
}
