import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehiculeService } from '../services/vehicule.service';
import { Vehicule } from '../model/vehicule';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent {

  vehicules: Vehicule[] = [];
  vehiculeToAdd: Vehicule = { matricule: '', modele: '', couleur: '', energie: '', prix: 0 };
  isSubmitting: boolean = false;

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
}
