import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../model/vehicule';
import { VehiculeService } from '../services/vehicule.service';

@Component({
  selector: 'app-delete-vehicule',
  templateUrl: './delete-vehicule.component.html',
  styleUrls: ['./delete-vehicule.component.css']
})
export class DeleteVehiculeComponent implements OnInit {

  vehicules: Vehicule[] = [];
  vehiculeIdToDelete: string = '';
  selectedVehiculeForDeletion: Vehicule | null = null;
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

  onVehiculeIdToDeleteChange(event: string): void {
    this.vehiculeIdToDelete = event;
    this.selectedVehicule = this.vehicules.find(v => v.id === this.vehiculeIdToDelete) || null;
  }

  deleteVehicule(): void {
    if (this.vehiculeIdToDelete) {
      this.vehiculeService.deleteVehicule(this.vehiculeIdToDelete).subscribe(
        () => {
          console.log('Véhicule supprimé avec succès');
          this.loadVehicules();
          this.selectedVehiculeForDeletion = null;
          this.vehiculeIdToDelete = ''; // Réinitialiser l'ID après la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du véhicule', error);
        }
      );
    } else {
      console.error('ID du véhicule à supprimer non défini');
    }
  }

}
