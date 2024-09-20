import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusModalPage } from './bus-modal.page';

describe('BusModalPage', () => {
  let component: BusModalPage;
  let fixture: ComponentFixture<BusModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
