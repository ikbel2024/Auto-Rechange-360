import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule'; // Importer l'interface Vehicule

@Component({
  selector: 'app-maintenance-vehicule',
  templateUrl: './maintenance-vehicule.component.html',
  styleUrls: ['./maintenance-vehicule.component.css']
})
export class MaintenanceVehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];
  vehiculeToAdd: Vehicule = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 }; // Initialiser avec les valeurs par défaut de l'interface
  selectedVehiculeId: string = ''; // ID du véhicule sélectionné pour l'édition

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

  addVehicule(): void {
    this.vehiculeService.addVehicule(this.vehiculeToAdd).subscribe(
      (data) => {
        console.log('Véhicule ajouté avec succès', data);
        this.loadVehicules(); // Recharger la liste après l'ajout
        this.vehiculeToAdd = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 }; // Réinitialiser le modèle d'ajout
      },
      (error) => {
        console.error('Error adding vehicule', error);
      }
    );
  }

  updateVehicule(): void {
    if (!this.selectedVehiculeId) {
      console.error('ID du véhicule non spécifié pour la mise à jour');
      return;
    }
    // Supposons que this.vehiculeToAdd contient les données mises à jour du véhicule
    this.vehiculeService.updateVehicule(this.selectedVehiculeId, this.vehiculeToAdd).subscribe(
      (data) => {
        console.log('Véhicule mis à jour avec succès', data);
        this.loadVehicules(); // Recharger la liste après la mise à jour
        this.clearSelection();
      },
      (error) => {
        console.error('Error updating vehicule', error);
      }
    );
  }

  deleteVehicule(id: string): void {
    this.vehiculeService.deleteVehicule(id).subscribe(
      () => {
        this.vehicules = this.vehicules.filter(v => v.matricule !== id);
      },
      (error) => {
        console.error('Error deleting vehicule', error);
      }
    );
  }

  selectVehiculeForUpdate(id: string): void {
    this.selectedVehiculeId = id;
    this.vehiculeService.getVehiculeById(id).subscribe(
      (data) => {
        this.vehiculeToAdd = data; // Remplir le formulaire avec les données du véhicule sélectionné
      },
      (error) => {
        console.error('Error fetching vehicule for update', error);
      }
    );
  }

  clearSelection(): void {
    this.selectedVehiculeId = '';
    this.vehiculeToAdd = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 }; // Réinitialiser l'interface
  }
}
