import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service'; 
import { Vehicule } from '../model/vehicule';

@Component({
  selector: 'app-maintenance-vehicule',
  templateUrl: './maintenance-vehicule.component.html',
  styleUrls: ['./maintenance-vehicule.component.css']
})
export class MaintenanceVehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (data: Vehicule[]) => {
        this.vehicules = data;
      },
      (error) => {
        console.error('Error fetching vehicules', error);
      }
    );
  }

  onDeleteVehicule(id: string): void {
    this.vehiculeService.deleteVehicule(id).subscribe(
      () => {
        this.vehicules = this.vehicules.filter(v => v.matricule !== id);
      },
      (error) => {
        console.error('Error deleting vehicule', error);
      }
    );
  }

  onUpdateVehicule(id: string): void {
    // Implement the update logic, e.g., open a modal with a form to edit the vehicle
  }
}
