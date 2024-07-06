import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceVehiculeComponent } from './maintenance-vehicule.component';

describe('MaintenanceVehiculeComponent', () => {
  let component: MaintenanceVehiculeComponent;
  let fixture: ComponentFixture<MaintenanceVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
