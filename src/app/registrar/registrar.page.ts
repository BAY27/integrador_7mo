import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  @Input() mostrarRol: boolean = false; // Recibir el valor desde el modal
  txt_cedula: string = '';
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_clave: string = '';
  txt_correo: string = '';
  txt_rol: string = 'Conductor';  // Predeterminado a Conductor

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public servicio: AccesoService
  ) {}

  vcedula() {
    let datos = {
      accion: 'vcedula',
      cedula: this.txt_cedula,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.txt_cedula = '';
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  async registrarPersona() {
    if (!this.txt_cedula || !this.txt_nombre || !this.txt_apellido || !this.txt_clave || !this.txt_correo || (this.mostrarRol && !this.txt_rol)) {
      this.servicio.showToast('Faltan datos');
      return;
    }

    let datos = {
      accion: 'registrar',
      cedula: this.txt_cedula,
      nombre: this.txt_nombre,
      apellido: this.txt_apellido,
      clave: this.txt_clave,
      correo: this.txt_correo,
      tipo_persona: this.txt_rol || "Estudiante"
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast('Usuario registrado correctamente');
        this.modalCtrl.dismiss();

        if (this.txt_rol === 'Conductor') {
          this.navCtrl.navigateForward(['/completar-perfil-chofer'], {
            queryParams: {
              cedula: datos.cedula,
              nombre: datos.nombre,
              apellido: datos.apellido
            }
          });
        }
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
