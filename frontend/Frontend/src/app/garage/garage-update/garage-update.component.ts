import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GarageService } from '../../services/garage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../model/garage.model'; 
import { Garage } from '../../model/garage.model';

@Component({
  selector: 'app-garage-update',
  templateUrl: './garage-update.component.html',
  styleUrls: ['./garage-update.component.css']
})
export class GarageUpdateComponent implements OnInit {
  garageForm: FormGroup;
  garage: Garage = {
    _id: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    openingHours: '',
    servicesOffered: [],
    employees: [],
    vehiclesUnderRepair: [],
    rating: 0,
    reviews: []
  };

  constructor(
    private fb: FormBuilder,
    private garageService: GarageService,
    private router: Router,
    private route: ActivatedRoute
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
      employees: this.fb.array([]),
      vehiclesUnderRepair: this.fb.array([]),
      rating: [0],
      reviews: [[]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.garageService.getGarageById(id).subscribe(
        (garage: Garage) => {
          this.garage = garage;
          this.initializeForm();
        },
        (error: any) => {
          console.error('Error fetching garage details:', error);
        }
      );
    }
  }

  private initializeForm(): void {
    // Pré-remplir le formulaire avec les données du garage
    this.garageForm.patchValue(this.garage);

    // Initialiser le FormArray pour les employés
    this.garage.employees.forEach(employee => {
      this.addEmployee(employee);
    });
  }

  get employees(): FormArray {
    return this.garageForm.get('employees') as FormArray;
  }

  addEmployee(employee?: Employee): void {
    const employeeFormGroup = this.fb.group({
      name: [employee ? employee.name : '', Validators.required],
      position: [employee ? employee.position : '', Validators.required],
      phone: [employee ? employee.phone : '', Validators.required],
      email: [employee ? employee.email : '', [Validators.required, Validators.email]],
    });

    this.employees.push(employeeFormGroup);
  }

  removeEmployee(index: number): void {
    this.employees.removeAt(index);
  }

  onSubmit(): void {
    if (this.garageForm.valid) {
      this.garageService.updateGarageService(this.garage._id, this.garageForm.value).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(`Erreur lors de la mise à jour du garage : ${error.message}`);
          return of(null);
        })
      ).subscribe(
        (response: any) => {
          if (response && response.success) {
            console.log('Garage mis à jour avec succès :', response);
            this.router.navigate(['/garage']);
          } else {
            console.error('Réponse inattendue du serveur :', response);
          }
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du garage :', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide');
    }
  }
}