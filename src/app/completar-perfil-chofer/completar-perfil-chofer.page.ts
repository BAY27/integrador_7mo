import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completar-perfil-chofer',
  templateUrl: './completar-perfil-chofer.page.html',
  styleUrls: ['./completar-perfil-chofer.page.scss'],
})
export class CompletarPerfilChoferPage implements OnInit {
  cedula: string = '';
  nombre: string = '';
  apellido: string = '';
  
  // Datos adicionales que el chofer debe completar
  telefono: string = '';
  licencia: string = '';

  constructor(
    private servicio: AccesoService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Obtener los datos pasados desde la página de registro
    this.route.queryParams.subscribe(params => {
      this.cedula = params['cedula'];
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
    });
  }

  // Completar el perfil de chofer y guardar en la tabla choferes
    completarPerfil() {
      const boton = document.querySelector('ion-button');
      if (boton) {
        boton.setAttribute('disabled', 'true');
      }

      let datosChofer = {
        accion: 'nuevo_chofer',
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        licencia: this.licencia
      };

      this.servicio.postData(datosChofer).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.servicio.showToast(res.mensaje);
            this.navCtrl.navigateRoot('/home');
          } else {
            this.servicio.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error al completar el perfil: ', error);
          this.servicio.showToast('Error de conexión con el servidor');
        },
        () => {
          if (boton) {
            boton.removeAttribute('disabled');
          }
        }
      );
    }
}