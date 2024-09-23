import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.page.html',
  styleUrls: ['./choferes.page.scss'],
})
export class ChoferesPage implements OnInit {
  choferes: any = []; // Lista de choferes

  constructor(public navCtrl: NavController, public servicio: AccesoService) {}

  ngOnInit() {
    this.obtenerChoferes(); // Llamada para obtener los choferes cuando la página se cargue
  }

  obtenerChoferes() {
    let datos = {
      accion: 'listar_choferes' // Acción para obtener choferes del backend
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado === true) {
        this.choferes = res.choferes; // Asignar los choferes a la variable
      } else {
        this.servicio.showToast(res.mensaje);
      }
    }, (error) => {
      console.error('Error al obtener los choferes:', error);
      this.servicio.showToast("Error al conectar con el servidor. Intenta nuevamente.");
    });
  }

  // Función para agregar un nuevo chofer
  nuevo() {
    this.navCtrl.navigateForward(['chofer']);
  }

  // Función para editar un chofer
  editar(codchofer: string) {
    // Navegación a la página de edición pasando el ID del chofer
    this.navCtrl.navigateForward(['editar-chofer', codchofer]); // Se pasa el ID del chofer
  }
  volver() {
    this.navCtrl.navigateRoot('/menu');
  }
  // Función para eliminar un chofer
  eliminar(codchofer: string) {
    // Navegación a la página de eliminación pasando el ID del chofer
    this.navCtrl.navigateRoot(['eliminar-chofer', codchofer]); // Se pasa el ID del chofer
  }
}
