import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
})
export class RclavePage implements OnInit {
  txt_cedula: string = '';
  txt_clave: string = '';
  txt_correo: string = '';
  txt_cclave: string = '';
  codigo: string = '';
  mensaje: string = '';
  coincide: string = '';

  // Control de los campos deshabilitados
  isCodigoDisabled: boolean = true;
  isClaveDisabled: boolean = true;
  isCambiarDisabled: boolean = true;

  constructor(
    public modalCtrl: ModalController,
    public servicio: AccesoService
  ) {}

  ngOnInit() {}

  vclave() {
    if (this.txt_clave === this.txt_cclave) {
      this.mensaje = '';
      this.coincide = 'si';
    } else {
      this.mensaje = 'Las claves no coinciden';
      this.coincide = 'no';
    }
  }

  // Función para habilitar el campo de código
  enviarCodigo() {
    this.isCodigoDisabled = false;
  }

  // Función que se ejecuta cuando se introduce el código
  checkCodigo() {
    if (this.codigo.length === 4) {
      this.isClaveDisabled = false;
      this.isCambiarDisabled = false;
    }
  }

  // Función para cambiar la clave
  cclave() {
    if (this.coincide === 'no') {
      this.servicio.showToast('Claves no coinciden');
    } else if (this.txt_cedula === '' || this.txt_correo === '' || this.txt_cclave === '') {
      this.servicio.showToast('Faltan datos');
    } else {
      let datos = {
        accion: 'cambiarclave',
        cedula: this.txt_cedula,
        correo: this.txt_correo,
        clave: this.txt_clave,
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
