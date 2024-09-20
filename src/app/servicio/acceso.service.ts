import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  server: string = "http://localhost/WsBuses24/ws_buses.php";

  constructor(public http: HttpClient, public toastCtrl: ToastController) { }

  // Enviar datos al servidor para autenticación
  postData(body: any) {
    let head = new HttpHeaders({ 'Content-Type': 'application/json, charset=utf8' });
    let options = { headers: head };
    return this.http.post(this.server, JSON.stringify(body), options);
  }

  // Mostrar un mensaje Toast
  async showToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  // Crear una sesión
  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor,
    });
  }

  // Obtener valor de la sesión
  async getSession(id: string) {
    const item = await Preferences.get({
      key: id,
    });
    return item.value;
  }

  // Cerrar sesión (limpiar todos los datos)
  async closeSession() {
    await Preferences.clear();
  }
}
