import { Component } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule';

@Component({
  selector: 'app-display-vehicules',
  templateUrl: './display-vehicules.component.html',
  styleUrls: ['./display-vehicules.component.css']
})
export class DisplayVehiculesComponent {

  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule | null = null;
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

  deleteVehicule(id?: string): void {
    if (id) {
      this.vehiculeService.deleteVehicule(id).subscribe(
        () => {
          console.log(`Véhicule avec l'id ${id} supprimé.`);
          // Actualiser la liste des véhicules après la suppression
          this.loadVehicules();
        },
        (error) => {
          console.error(`Erreur lors de la suppression du véhicule avec l'id ${id}`, error);
        }
      );
    } else {
      console.warn('ID du véhicule non défini, impossible de supprimer.');
    }
  }

  onVehiculeIdToViewChange(id: string): void {
    if (id) {
      this.vehiculeService.getVehiculeById(id).subscribe(
        (data: Vehicule) => {
          this.selectedVehicule = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération du véhicule', error);
          this.selectedVehicule = null;
        }
      );
    } else {
      this.selectedVehicule = null;
    }
  }
}
