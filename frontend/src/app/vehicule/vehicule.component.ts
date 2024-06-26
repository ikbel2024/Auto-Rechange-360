import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Vehicule } from 'src/app/model/vehicule';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit(): void {
    this.loadVehicules();
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      data => {
        this.vehicules = data;
      },
      error => {
        console.error('Erreur lors du chargement des véhicules', error);
      }
    );
  }

  getImagePath(vehicule: Vehicule): string {
    return `assets/images/${vehicule.modele.toLowerCase().replace(/ /g, '')}.jpg`;
  }
}
