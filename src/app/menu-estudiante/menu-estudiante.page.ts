import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-menu-estudiante',
  templateUrl: './menu-estudiante.page.html',
  styleUrls: ['./menu-estudiante.page.scss'],
})
export class MenuEstudiantePage implements OnInit {
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

    // Verificar si el rol es Estudiante, si no redirige
    this.servicio.getSession('tipo_persona').then((res: any) => {
      if (res !== 'Estudiante') {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  // Función para ir a la página de monitoreo
  irmonitoreo() {
    this.navCtrl.navigateForward('/real-time');
  }
}
