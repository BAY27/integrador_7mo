import { Component } from '@angular/core';
import { BusService } from '../services/bus.service'; // Adjust the path as necessary
import { ModalController } from '@ionic/angular';
import { BusModalPage } from '../bus-modal/bus-modal.page';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage {
  buses: any[] = [];

  constructor(private busService: BusService, private modalController: ModalController) {}

  ionViewWillEnter() {
    this.loadBuses();
  }

  async loadBuses() {
    try {
      this.busService.getBuses().subscribe((data) => {
        this.buses = data
      });
    } catch (error) {
      console.error('Error fetching buses:', error);
    }  }

  async openModal(bus?: any) {
    const modal = await this.modalController.create({
      component: BusModalPage,
      componentProps: { bus }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data?.codbus) {
        this.busService.updateBus(data).subscribe((data) => {
            this.loadBuses();
          });

      } else {
        this.busService.createBus(data).subscribe((data) => {
          this.loadBuses();
        });
      }
    }
  }

  async deleteBus(codbus: number) {
    this.busService.deleteBus(codbus).subscribe((data) => {
      this.loadBuses();
    });
  }
}
