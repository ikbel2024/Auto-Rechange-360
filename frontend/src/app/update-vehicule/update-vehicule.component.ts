import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule';

@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit {

  vehiculeToUpdate: Vehicule = {
    id: '',
    matricule: '',
    modele: '',
    couleur: '',
    energie: '',
    prix: 0
  };
  isSubmitting: boolean = false;

  constructor(private route: ActivatedRoute, private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const vehiculeId = params['id'];
      if (vehiculeId) {
        this.loadVehiculeDetails(vehiculeId);
      }
    });
  }

  loadVehiculeDetails(id: string): void {
    this.vehiculeService.getVehiculeById(id).subscribe(
      (vehicule: Vehicule) => {
        this.vehiculeToUpdate = vehicule;
        console.log('Détails du véhicule chargés:', vehicule); // Vérifiez les détails du véhicule chargés
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du véhicule', error);
      }
    );
  }

  updateVehicule(form: NgForm): void {
    if (form.valid && this.vehiculeToUpdate.id) {
      this.isSubmitting = true;
      this.vehiculeService.updateVehicule(this.vehiculeToUpdate.id, this.vehiculeToUpdate).subscribe(
        () => {
          console.log('Véhicule mis à jour avec succès');
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du véhicule', error);
          this.isSubmitting = false;
        }
      );
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
}
