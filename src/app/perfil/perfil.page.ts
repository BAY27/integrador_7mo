import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  persona: any = [];
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_correo: string = '';
  txt_clave: string = '';
  txt_cclave: string = '';
  txt_rol: string = '';  // Nueva variable para almacenar el rol
  mensaje: string = '';
  cedula: string = '';
  codigo: string = '';

  constructor(public navCtrl: NavController, public servicio: AccesoService) {
    this.servicio.getSession('cod_persona').then((res: any) => {
      this.codigo = res;
      console.log('Código de usuario obtenido:', this.codigo); // Verifica si el código se obtiene correctamente
  
      if (this.codigo) {
        this.datospersona();
      } else {
        this.servicio.showToast("No se pudo obtener el código del usuario.");
      }
    });
  }
  

  ngOnInit() {}

  // Obtener datos de la persona
  datospersona() {
    let datos = {
      "accion": "dpersona",
      "codigo": this.codigo
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res); // Log para verificar la respuesta
  
      if (res.estado) {
        this.persona = res.persona[0]; // Recibe los datos del backend
        this.cedula = this.persona.cedula;
        this.txt_nombre = this.persona.nombre;
        this.txt_apellido = this.persona.apellido;
        this.txt_correo = this.persona.correo;
        this.txt_clave = this.persona.clave;
        this.txt_cclave = this.persona.clave;
        this.txt_rol = this.persona.rol; // Asigna el rol a la variable
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  

  // Actualizar perfil sin modificar el rol
  actualizar() {
    let datos = {
      "accion": "aperfil",
      'codigo': this.codigo,
      'nombre': this.txt_nombre,
      'apellido': this.txt_apellido,
      'correo': this.txt_correo,
      'clave': this.txt_clave,
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancelar() {
    this.navCtrl.back();
  }

  vclave() {
    if (this.txt_clave !== this.txt_cclave) {
      this.mensaje = 'Las claves no coinciden';
    } else {
      this.mensaje = '';
    }
  }
}
