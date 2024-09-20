import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McontactoPage } from './mcontacto.page';

describe('McontactoPage', () => {
  let component: McontactoPage;
  let fixture: ComponentFixture<McontactoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(McontactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
