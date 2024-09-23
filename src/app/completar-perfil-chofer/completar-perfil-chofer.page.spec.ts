import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletarPerfilChoferPage } from './completar-perfil-chofer.page';

describe('CompletarPerfilChoferPage', () => {
  let component: CompletarPerfilChoferPage;
  let fixture: ComponentFixture<CompletarPerfilChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletarPerfilChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
