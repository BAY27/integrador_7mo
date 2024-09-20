import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
AccesoService
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  txt_cedula: string = '';
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_clave: string = '';
  txt_correo: string = '';
  
  mensaje: string = '';
  constructor(public http:HttpClient, public navCtrl:NavController,public modalCtrl:ModalController, public servicio:AccesoService) { }
  
  vcedula() {
    
    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula,
    };

    // Realiza la consulta para verificar si la cédula ya está registrada
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.txt_cedula="";
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  registrarPersona() {
    if (
      this.txt_cedula === '' || 
      this.txt_nombre === '' || 
      this.txt_apellido === '' || 
      this.txt_clave === '' || 
      this.txt_correo === ''
    ) {
      this.servicio.showToast('Faltan datos');
    } else {
      let datos = {
        accion: 'registrar',
        cedula: this.txt_cedula,
        nombre: this.txt_nombre,
        apellido: this.txt_apellido,
        clave: this.txt_clave,
        correo: this.txt_correo,
      };

      this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.modalCtrl.dismiss();
          this.servicio.showToast(res.mensaje);
        } else {
          this.servicio.showToast(res.mensaje);
        }
      });
    }
  }

cancelar() {
  this.modalCtrl.dismiss();
}


}