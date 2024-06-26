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
  vehiculeToAdd: Vehicule = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 };
  selectedVehiculeId: string = '';
  isSubmitting: boolean = false;

  vehiculeIdToDelete: string = '';
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

  addVehicule(form: NgForm): void {
    if (form.invalid) {
      return;
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

  updateVehicule(form: NgForm): void {
    if (form.valid && this.vehiculeToUpdate.id) {
      this.isSubmitting = true;
      this.vehiculeService.updateVehicule(this.vehiculeToUpdate.id, this.vehiculeToUpdate).subscribe(
        () => {
          console.log('Véhicule mis à jour avec succès');
          this.loadVehicules();
          form.resetForm();
          this.clearUpdateForm();
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error updating vehicule', error);
          this.isSubmitting = false;
        }
      );
    } else {
      console.error('ID du véhicule manquant ou formulaire invalide');
    }
  }

  clearUpdateForm(): void {
    this.vehiculeToUpdate = {
      id: '',
      matricule: '',
      modele: '',
      couleur: '',
      energie: '',
      prix: 0
    };
  }

  confirmDelete(id: string | undefined): void {
    if (id) {
      console.log(`Confirmation de la suppression du véhicule avec l'ID : ${id}`);
      this.deleteVehicule();
    } else {
      console.error('ID du véhicule à supprimer non défini');
    }
  }
  

  deleteVehicule(): void {
    if (this.vehiculeIdToDelete) {
      this.vehiculeService.deleteVehicule(this.vehiculeIdToDelete).subscribe(
        () => {
          console.log('Véhicule supprimé avec succès');
          this.loadVehicules();
          this.selectedVehicule = null;
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


  selectVehiculeForUpdate(id: string): void {
    this.selectedVehiculeId = id;
    this.vehiculeService.getVehiculeById(id).subscribe(
      (data: Vehicule) => {
        this.vehiculeToUpdate = { ...data }; // Copier les données du véhicule sélectionné dans le formulaire de mise à jour
      },
      (error) => {
        console.error('Erreur lors de la récupération du véhicule pour mise à jour', error);
      }
    );
  }

  clearSelection(): void {
    this.selectedVehiculeId = '';
    this.vehiculeToUpdate = {
      id: '',
      matricule: '',
      modele: '',
      couleur: '',
      energie: '',
      prix: 0
    };
  }


  onVehiculeIdToDeleteChange(id: string): void {
    if (id) {
      this.vehiculeService.getVehiculeById(id).subscribe(
        (data: Vehicule) => {
          this.selectedVehicule = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération du véhicule pour suppression', error);
          this.selectedVehicule = null;
        }
      );
    } else {
      this.selectedVehicule = null;
    }
  }

}
