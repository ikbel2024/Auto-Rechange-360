import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule';

@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit {

  isSubmitting: boolean = false;
  selectedVehiculeId: string = ''; 
  vehicules: Vehicule[] = [];
  vehiculeToAdd: Vehicule = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 }; // Initialiser avec les valeurs par défaut de l'interface


  vehiculeToUpdate: Vehicule = {
    id: '',
    matricule: '',
    modele: '',
    couleur: '',
    energie: '',
    prix: 0
  };

  constructor( private route: ActivatedRoute, private router: Router, private vehiculeService: VehiculeService) 
  {}

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
