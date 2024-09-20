import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudiantesModalPage } from './estudiantes-modal.page';

describe('EstudiantesModalPage', () => {
  let component: EstudiantesModalPage;
  let fixture: ComponentFixture<EstudiantesModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
