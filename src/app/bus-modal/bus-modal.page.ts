import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bus-modal',
  templateUrl: './bus-modal.page.html',
  styleUrls: ['./bus-modal.page.scss'],
})
export class BusModalPage implements OnInit {
  @Input() bus: any = { placa: '', color: "", marca: "", modelo: "", numeroasientos: 0}; // Initialize empty product objec

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.bus) {
      this.bus = { placa: '', color: "", marca: "", modelo: "", numeroasientos: 0}; // Initialize empty product object
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.bus);
  }
}
