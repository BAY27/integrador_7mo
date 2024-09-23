import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioRutaPage } from './servicio-ruta.page';

describe('ServicioRutaPage', () => {
  let component: ServicioRutaPage;
  let fixture: ComponentFixture<ServicioRutaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioRutaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
