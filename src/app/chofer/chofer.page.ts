import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {
  txt_cedula: string = "";  // Agregar campo para la cédula
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_telefono: string = "";
  txt_licencia: string = ""; // Campo para la licencia
  mensaje: string = "";
  cod_persona: string = "";

  constructor(protected navCtrl: NavController, protected servicio: AccesoService) {
    this.servicio.getSession('cod_persona').then((res: any) => {
      this.cod_persona = res;
    });
  }

  ngOnInit() {}

  // Función para verificar si la cédula ya está registrada
  verificarCedula() {
    let datos = {
      "accion": "v_cedula",  // Acción para verificar la cédula
      "cedula": this.txt_cedula
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.mensaje = res.mensaje; // Mostrar mensaje si la cédula ya está registrada
      } else {
        this.mensaje = ""; // Limpiar el mensaje si la cédula es válida (disponible)
      }
    });
  }

  guardar() {
    let datos = {
      "accion": "nuevo_chofer",
      "cedula": this.txt_cedula, // Incluir la cédula al guardar
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "telefono": this.txt_telefono,
      "licencia": this.txt_licencia
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.navCtrl.navigateRoot(['/choferes']);
        this.servicio.showToast(res.mensaje);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.navCtrl.navigateRoot(['/choferes']);
  }
}
