import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController, } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.page.html',
  styleUrls: ['./editar-chofer.page.scss'],
})
export class EditarChoferPage implements OnInit {
  chofer: any = [];
  codchofer: string | null = ""; // Puede ser string o null
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_telefono: string = "";
  txt_cedula: string = "";
  txt_licencia: string = "";
  mensaje: string = "";

  constructor(
    public servicio: AccesoService,
    public navCtrl: NavController,
    private route: ActivatedRoute // Inyectar ActivatedRoute para capturar el parámetro de la URL
  ) {
    this.codchofer = this.route.snapshot.paramMap.get('id'); // Obtener el ID del chofer de la URL
    this.cargarDatos(); // Cargar los datos al inicializar el componente
  }

  ngOnInit() {
    this.codchofer = this.route.snapshot.paramMap.get('id');
    if (this.codchofer) {
      this.cargarDatos(); // Cargar los datos solo si hay un ID válido
    } else {
      this.servicio.showToast("El ID de chofer no es válido.");
    }
  }

  // Cargar los datos del chofer
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

  // Actualizar los datos del chofer
  actualizar() {
    let datos = {
      accion: "achofer",
      codchofer: this.codchofer,
      nombre: this.txt_nombre,
      apellido: this.txt_apellido,
      telefono: this.txt_telefono,
      cedula: this.txt_cedula,
      licencia: this.txt_licencia
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateRoot('choferes');
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.navCtrl.navigateRoot('/choferes');
  }
}
