
import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { VehiculeService } from '../services/vehicule.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  vehicules: any[] = [];
  modeleCount: { [key: string]: number } = {};

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.vehiculeService.getVehicules().subscribe((data: any[]) => {
      this.vehicules = data;
      this.calculateModeleCount();
    });
  }
  calculateModeleCount(): void {
    this.vehicules.forEach((vehicule) => {
      if (this.modeleCount[vehicule.modele]) {
        this.modeleCount[vehicule.modele]++;
      } else {
        this.modeleCount[vehicule.modele] = 1;
      }
    });
  }

  getProgressValue(modele: string): number {
    const count = this.modeleCount[modele] || 0;
    const total = this.vehicules.length;
    return (count / total) * 100;
  }

  getProgressWidth(modele: string): string {
    return this.getProgressValue(modele) + '%';
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (data: Vehicule[]) => {
        this.vehicules = data;
      },
      error => {
        console.error('Error fetching vehicules:', error);
      }
    );
  }

}

  

   


