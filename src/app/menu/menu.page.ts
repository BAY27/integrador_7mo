import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
import { RegistrarPage } from '../registrar/registrar.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  nombre: string = "";
  roles: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AccesoService,
    public modalCtrl: ModalController) {}

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

    // Obtener el rol de la persona desde la sesión
    this.servicio.getSession('tipo_persona').then((res: any) => {
      if (res === 'Administrador') {
        this.roles = res;
      } else {
        // Redirigir a una página de error o inicio de sesión si no es Administrador
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  // Navegaciones a diferentes páginas según el rol de Administrador
  irperfil() {
    this.navCtrl.navigateForward('/perfil');
  }
  async crearUsuario() {
    const modal = await this.modalCtrl.create({
      component: RegistrarPage,
      componentProps: { mostrarRol: true }
    });
    return await modal.present();
  }

  irchofer() {
    this.navCtrl.navigateForward('/choferes');
  }

  irestudiante() {
    this.navCtrl.navigateForward('/estudiantes');
  }

  irbus() {
    this.navCtrl.navigateForward('/bus');
  }

  irmonitoreo() {
    this.navCtrl.navigateForward('/real-time');
  }
}
