import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estudiantes-modal',
  templateUrl: './estudiantes-modal.page.html',
  styleUrls: ['./estudiantes-modal.page.scss'],
})
export class EstudiantesModalPage implements OnInit {
  @Input() estudiante: any = { cedula: '', nombres_apellidos: ""}; // Initialize empty product object

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.estudiante) {
      this.estudiante = { cedula: '', nombres_apellidos: ""}; // Initialize empty product object
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.estudiante);
  }
}
