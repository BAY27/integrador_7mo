import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-menu-conductor',
  templateUrl: './menu-conductor.page.html',
  styleUrls: ['./menu-conductor.page.scss'],
})
export class MenuConductorPage implements OnInit {
  nombre: string = "";

  constructor(public navCtrl: NavController, public servicio: AccesoService) {}

  // Obtener los datos desde la sesión cuando la página se inicializa
  ngOnInit() {
    // Obtener el nombre de la persona desde la sesión
    this.servicio.getSession('nombre_persona').then((res: any) => {
      if (res) {
        this.nombre = res;
      } else {
        this.servicio.showToast('Error obteniendo el nombre.');
      }
    });

    // Verificar si el rol es Conductor, si no redirige
    this.servicio.getSession('tipo_persona').then((res: any) => {
      if (res !== 'Conductor') {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  // Funciones para ir a las páginas de Horarios y Recorridos
  irhorarios() {
    this.navCtrl.navigateForward('/horarios');
  }

  irrecorridos() {
    this.navCtrl.navigateForward('/recorridos');
  }
}
