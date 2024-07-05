import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-display-vehicules',
  templateUrl: './display-vehicules.component.html',
  styleUrls: ['./display-vehicules.component.css']
})

export class DisplayVehiculesComponent implements OnInit {

  vehicules: Vehicule[] = [];
  selectedVehicule: Vehicule | null = null;
  modeleSearchQuery: string = '';
  filteredVehicules: Vehicule[] = []; // Nouvelle propriété pour les véhicules filtrés


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
        console.error('Erreur lors du chargement des véhicules', error);
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

  searchByModele(): void {
    if (this.modeleSearchQuery) {
      this.vehiculeService.findVehiculeByModele(this.modeleSearchQuery).subscribe(
        (data: Vehicule[]) => {
          this.filteredVehicules = data; // Mettre à jour la liste filtrée avec les résultats de la recherche
        },
        (error) => {
          console.error('Erreur lors de la recherche par modèle', error);
        }
      );
    } else {
      this.filteredVehicules = []; // Réinitialiser la liste filtrée si la requête est vide
    }
  }
  
  
}
