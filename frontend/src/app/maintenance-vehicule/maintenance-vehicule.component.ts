import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule'; // Importer l'interface Vehicule
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-maintenance-vehicule',
  templateUrl: './maintenance-vehicule.component.html',
  styleUrls: ['./maintenance-vehicule.component.css']
})
export class MaintenanceVehiculeComponent implements OnInit {
  
  vehicules: Vehicule[] = [];
  constructor(private vehiculeService: VehiculeService) {}

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

  ngOnInit(): void {
    this.loadVehicules();
  }

  displayedComponent: string = 'display'; // Par défaut sur 'display'

  showComponent(component: string) {
    this.displayedComponent = component;
  }


}
