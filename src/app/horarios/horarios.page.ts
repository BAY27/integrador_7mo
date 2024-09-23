import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  horaInicio: string = '';
  horaFin: string = '';
  horarios: any[] = [];

  constructor(private servicio: AccesoService, private navCtrl: NavController) {}

  ngOnInit() {
    this.cargarHorarios();
  }

  cargarHorarios() {
    let datos = { accion: 'listar_horarios' };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.horarios = res.horarios;
      } else {
        this.servicio.showToast('Error al cargar horarios.');
      }
    });
  }

  agregarHorario() {
    if (!this.horaInicio || !this.horaFin) {
      this.servicio.showToast('Por favor, ingrese hora de inicio y fin.');
      return;
    }

    let datosHorario = {
      horainicio: this.horaInicio,
      horafin: this.horaFin,
    };

    this.servicio.postData({ accion: 'agregar_horario', ...datosHorario }).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.servicio.showToast('Horario guardado correctamente');
          this.cargarHorarios();
          this.horaInicio = '';
          this.horaFin = '';
        } else {
          this.servicio.showToast('Error al guardar el horario');
        }
      },
      (error) => {
        console.error('Error de conexión:', error);
        this.servicio.showToast('Error de conexión con el servidor');
      }
    );
  }

  eliminarHorario(codhorario: number) {
    let datos = { accion: 'eliminar_horario', codhorario: codhorario };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.cargarHorarios();
      } else {
        this.servicio.showToast('Error al eliminar horario.');
      }
    });
  }

  volver() {
    this.navCtrl.navigateRoot('/menu');
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    const date = new Date(hora);
    if (isNaN(date.getTime())) {
      // Si la fecha no es válida, asumimos que es solo una hora en formato HH:mm:ss
      return hora.substr(0, 5); // Devuelve solo HH:mm
    }
    return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', hour12: false });
  }
}