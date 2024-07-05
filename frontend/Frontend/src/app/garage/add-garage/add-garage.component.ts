import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GarageService } from '../../services/garage.service';
import { Garage } from '../../model/garage.model';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.css']
})
export class AddGarageComponent implements OnInit {
  garageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private garageService: GarageService,
    private router: Router
  ) {
    this.garageForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      openingHours: ['', Validators.required],
      servicesOffered: ['', Validators.required],
      employees: this.fb.array([]), // Vous pouvez ajouter une logique pour gérer les employés ici
      vehiclesUnderRepair: this.fb.array([]), // Vous pouvez ajouter une logique pour gérer les véhicules ici
      rating: [0],
      reviews: [[]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.garageForm.valid) {
      this.garageService.addGarage(this.garageForm.value).subscribe(
        (response: any) => {
          if (response && response.message === 'Garage ajouté avec succès') {
            console.log('Garage ajouté avec succès:', response);
            this.router.navigate(['/garage']);
          } else {
            console.error('Réponse inattendue du serveur:', response);
            // Gérer la réponse inattendue ici, par exemple afficher un message d'erreur
          }
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du garage:', error);
          // Gérer l'erreur ici, par exemple afficher un message d'erreur
        }
      );
    } else {
      console.error('Formulaire invalide');
    }
  }
}