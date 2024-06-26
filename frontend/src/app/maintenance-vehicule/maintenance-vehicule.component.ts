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

  vehiculeToUpdate: Vehicule = {
    id: '',
    matricule: '',
    modele: '',
    couleur: '',
    energie: '',
    prix: 0
  };

  vehicules: Vehicule[] = [];
  vehiculeToAdd: Vehicule = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 }; // Initialiser avec les valeurs par défaut de l'interface
  selectedVehiculeId: string = ''; // ID du véhicule sélectionné pour l'édition
  isSubmitting: boolean = false; // Variable pour gérer l'état de soumission
  
  vehiculeIdToDelete: string = ''; // Déclaration de la propriété pour l'ID du véhicule à supprimer
  deletedVehicule: any; 


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

   addVehicule(form: NgForm): void {
    if (form.invalid) {
      return; // Arrêter l'ajout si le formulaire est invalide
    }

    this.isSubmitting = true;
    this.vehiculeService.addVehicule(this.vehiculeToAdd).subscribe(
      (data) => {
        console.log('Véhicule ajouté avec succès', data);
        this.loadVehicules();
        this.vehiculeToAdd = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 };
        form.resetForm();
        this.isSubmitting = false;
      },
      (error) => {
        console.error('Error adding vehicule', error);
        this.isSubmitting = false;
      }
    );
  }

 updateVehicule(form: NgForm) {
  if (form.valid && this.vehiculeToUpdate.id) { // Vérifiez que l'ID est défini
    this.isSubmitting = true;
    this.vehiculeService.updateVehicule(this.vehiculeToUpdate.id, this.vehiculeToUpdate).subscribe(
      () => {
        this.isSubmitting = false;
        form.resetForm();
      },
      error => {
        console.error(error);
        this.isSubmitting = false;
      }
    );
  } else {
    console.error("ID du véhicule manquant.");
  }
}


  clearUpdateForm() {
    this.vehiculeToUpdate = {
      id: '',
      matricule: '',
      modele: '',
      couleur: '',
      energie: '',
      prix: 0
    };
  }

 
  deleteVehicule(): void {
    if (this.vehiculeIdToDelete) {
      this.vehiculeService.deleteVehicule(this.vehiculeIdToDelete).subscribe(
        () => {
          // Après la suppression réussie, récupérez les détails du véhicule supprimé
          this.vehiculeService.getVehiculeById(this.vehiculeIdToDelete).subscribe(
            (data: any) => {
              this.deletedVehicule = data; // Mettre à jour les détails du véhicule supprimé
            },
            error => {
              console.error('Erreur lors de la récupération du véhicule après suppression:', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de la suppression du véhicule:', error);
        }
      );
    }
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
