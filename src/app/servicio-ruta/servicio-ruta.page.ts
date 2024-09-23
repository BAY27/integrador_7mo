import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-servicio-ruta',
  templateUrl: './servicio-ruta.page.html',
  styleUrls: ['./servicio-ruta.page.scss'],
})
export class ServicioRutaPage implements OnInit {
  buses: any[] = [];  // Listado de buses
  horarios: any[] = [];  // Listado de horarios
  codbus: number | null = null;  // Código de bus seleccionado
  codhorario: number | null = null;  // Código de horario seleccionado
  fecha: string = '';  // Fecha seleccionada en formato ISO
  fechaActual: string = new Date().toISOString();  // Fecha actual para evitar fechas anteriores
  codchofer: number | null = null;  // Código del chofer (obtenido desde la sesión)

  constructor(private servicio: AccesoService, private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarBuses();
    this.cargarHorarios();
    this.obtenerCodChofer();
  }

  // Obtener código del chofer desde la sesión
  obtenerCodChofer() {
    this.servicio.getSession('cod_persona').then((codchofer) => {
      if (codchofer) {
        this.codchofer = +codchofer;  // Convertir a número
      } else {
        console.error('No se pudo obtener el código del chofer.');
      }
    });
  }

  // Cargar los buses desde la base de datos
  cargarBuses() {
    this.servicio.postData({ accion: 'listar_buses' }).subscribe((res: any) => {
      if (res.estado) {
        this.buses = res.buses;
      } else {
        this.servicio.showToast('Error al cargar los buses.');
      }
    });
  }

  // Cargar los horarios desde la base de datos
  cargarHorarios() {
    this.servicio.postData({ accion: 'listar_horarios' }).subscribe((res: any) => {
      if (res.estado) {
        this.horarios = res.horarios;
      } else {
        this.servicio.showToast('Error al cargar los horarios.');
      }
    });
  }

  // Guardar el servicio de ruta
  guardarServicioRuta() {
    console.log("CodChofer:", this.codchofer);
    console.log("CodBus:", this.codbus);
    console.log("CodHorario:", this.codhorario);
    console.log("Fecha:", this.fecha);
  
    const datos = {
      accion: 'guardar_servicio_ruta',
      codchofer: this.codchofer,
      codbus: this.codbus,
      codhorario: this.codhorario,
      fecha: this.fecha
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      console.log(res);
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateBack('/menu-conductor');
      } else {
        this.servicio.showToast('Error al guardar servicio: ' + res.mensaje);
      }
    }, (error) => {
      console.error('Error al guardar el servicio de ruta:', error);
      this.servicio.showToast('Error al conectar con el servidor.');
    });
  }
  
  // Función para volver al menú anterior
  volver() {
    this.navCtrl.navigateRoot('/menu-conductor');
  }
}
