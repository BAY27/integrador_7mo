import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarChoferPage } from './editar-chofer.page';

describe('EditarChoferPage', () => {
  let component: EditarChoferPage;
  let fixture: ComponentFixture<EditarChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
