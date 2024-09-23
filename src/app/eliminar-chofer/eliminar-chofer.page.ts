import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eliminar-chofer',
  templateUrl: './eliminar-chofer.page.html',
  styleUrls: ['./eliminar-chofer.page.scss'],
})
export class EliminarChoferPage implements OnInit {
  chofer: any = [];
  codchofer: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_telefono: string = "";
  txt_cedula: string = "";
  txt_licencia: string = "";
  mensaje: string = "";

  public botones = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.cancelar();  // Llamar a la función cancelar si elige No
      },
    },
    {
      text: 'Sí',
      role: 'confirm',
      handler: () => {
        this.eliminar();  // Llamar a la función eliminar si elige Sí
      },
    }
  ];

  constructor(
    public servicio: AccesoService,
    public navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    // Obtener el ID del chofer desde la URL
    this.codchofer = this.route.snapshot.paramMap.get('id') || '';
    this.cargarDatos();
  }

  ngOnInit() {}

  cargarDatos() {
    let datos = {
      accion: "dchofer",
      codchofer: this.codchofer
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.chofer = res.datos;
        this.txt_nombre = this.chofer.nombre;
        this.txt_apellido = this.chofer.apellido;
        this.txt_telefono = this.chofer.telefono;
        this.txt_cedula = this.chofer.cedula;
        this.txt_licencia = this.chofer.licencia;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  eliminar() {
    let datos = {
      accion: "e_chofer",
      codchofer: this.codchofer
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateRoot('/choferes');
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.navCtrl.navigateRoot('/choferes');
  }
}
