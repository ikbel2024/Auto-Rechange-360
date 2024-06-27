
import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { VehiculeService } from '../services/vehicule.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

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
      error => {
        console.error('Error fetching vehicules:', error);
      }
    );
  }

   // Méthode pour calculer la largeur de la barre de progression
   getProgressWidth(prix: number): string {
    return prix + '%';
  }

}
