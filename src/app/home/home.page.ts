  import { Component } from '@angular/core';
  import { NavController, ModalController } from '@ionic/angular';
  import { AccesoService } from '../servicio/acceso.service';
  import { RegistrarPage } from '../registrar/registrar.page'; // Página de registro
  import { RclavePage } from '../rclave/rclave.page'; // Página de recuperar clave

  @Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
  })
  export class HomePage {
    txt_usuario: string = "";
    txt_clave: string = "";

    constructor(
      public navCtrl: NavController,
      public servicio: AccesoService,
      public modalCtrl: ModalController // Controlador de modal para abrir las páginas de registro y recuperar clave
    ) {}

    // Función de inicio de sesión
    loggin() {
      let datos = {
        accion: 'loggin',  // Acción enviada al backend
        usuario: this.txt_usuario,
        clave: this.txt_clave
      };

      // Llamada al servicio para enviar los datos de inicio de sesión
      this.servicio.postData(datos).subscribe((res: any) => {
        console.log('Respuesta del servidor:', res); // Log para verificar la respuesta

        if (res.estado === true) {
          console.log('Inicio de sesión exitoso', res.persona[0]);

          // Guardar el nombre y el rol del usuario en la sesión
          // Guardar el nombre, el rol y el código del usuario en la sesión
              this.servicio.createSession('cod_persona', res.persona[0].codigo); // Guardar el código del usuario
              this.servicio.createSession('nombre_persona', res.persona[0].nombre);
              this.servicio.createSession('tipo_persona', res.persona[0].tipo_persona);

          localStorage.setItem("role", res.persona[0].tipo_persona)

          // Redirigir según el rol del usuario
          if (res.persona[0].tipo_persona === 'Administrador') {
            console.log('Redirigir al menú de Administrador');
            this.navCtrl.navigateRoot('/menu');
          } else if (res.persona[0].tipo_persona === 'Estudiante') {
            console.log('Redirigir al menú de Estudiante');
            this.navCtrl.navigateRoot('/menu-estudiante');
          } else if (res.persona[0].tipo_persona === 'Conductor') {
            console.log('Redirigir al menú de Conductor');
            this.navCtrl.navigateRoot('/menu-conductor');
          }
        } else {
          // Mostrar un mensaje de error si las credenciales son incorrectas
          console.log('Credenciales incorrectas:', res.mensaje);
          this.servicio.showToast(res.mensaje);
        }
      }, (error) => {
        // Mostrar un mensaje de error si la solicitud falla
        console.error('Error al conectar con el servidor:', error);
        this.servicio.showToast("Error al conectar con el servidor. Intenta nuevamente.");
      });
    }

    // Función para abrir el modal de Registro
    async register() {
      const modal = await this.modalCtrl.create({
        component: RegistrarPage
      });
      return await modal.present();
    }

    // Función para abrir el modal de Recuperar Clave
    async recuperar() {
      const modal = await this.modalCtrl.create({
        component: RclavePage
      });
      return await modal.present();
    }
  }
