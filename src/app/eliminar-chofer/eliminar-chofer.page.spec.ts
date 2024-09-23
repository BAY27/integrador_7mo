import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarChoferPage } from './eliminar-chofer.page';

describe('EliminarChoferPage', () => {
  let component: EliminarChoferPage;
  let fixture: ComponentFixture<EliminarChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
