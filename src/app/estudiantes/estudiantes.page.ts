import { Component, OnInit } from '@angular/core';
import { StudianteService } from '../services/studiante.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { EstudiantesModalPage } from '../estudiantes-modal/estudiantes-modal.page';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudianteService, private modalController: ModalController, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  async openModal(estudiante?: any) {
    const modal = await this.modalController.create({
      component: EstudiantesModalPage,
      componentProps: { estudiante }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log("🚀 ~ EstudiantesPage ~ modal.onDidDismiss ~ result.data:", result.data)
        // this.saveProduct(result.data); // Save the edited customer
      }
    });
  }

  deleteStudent(codestudiante: number) {
    this.studentService.deleteStudent(codestudiante).subscribe(() => {
      this.loadStudents();
    });
  }
}
