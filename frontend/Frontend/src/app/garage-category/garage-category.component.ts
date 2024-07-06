import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GarageCategoryService } from '../services/garage-category.service';
import { GarageCategory } from '../model/garage-category.model';

@Component({
  selector: 'app-garage-category',
  templateUrl: './garage-category.component.html',
  styleUrls: ['./garage-category.component.css']
})
export class GarageCategoryComponent implements OnInit {
  garageCategories: GarageCategory[] = [];
  garageCategoryForm: FormGroup;
  nearbyForm: FormGroup;
  editingCategory: GarageCategory | null = null;
  submitButtonText = 'Submit';
  isEditing = false;

  servicesString: string = '';
  equipmentsString: string = '';
  certificationsString: string = '';

  constructor(
    private garageCategoryService: GarageCategoryService,
    private fb: FormBuilder
  ) {
    this.garageCategoryForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      servicesOffered: [[]],
      size: ['', Validators.required],
      equipment: [[]],
      certifications: [[]],
      pricingPolicy: ['', Validators.required],
      customerRelations: ['', Validators.required],
      address: [''],
      city: [''],
      postalCode: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });

    this.nearbyForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      distance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGarageCategories();
  }

  loadGarageCategories(): void {
    this.garageCategoryService.getAllGarageCategories().subscribe(
      (data: GarageCategory[]) => {
        this.garageCategories = data;
      },
      (error) => {
        console.error('Error loading garage categories:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateGarageCategory();
    } else {
      this.addGarageCategory();
    }
  }

  addGarageCategory(): void {
    if (this.garageCategoryForm.valid) {
      const newCategory: GarageCategory = {
        ...this.garageCategoryForm.value,
        servicesOffered: this.servicesString.split(',').map(service => service.trim()),
        equipment: this.equipmentsString.split(',').map(equipment => equipment.trim()),
        certifications: this.certificationsString.split(',').map(certification => certification.trim()),
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(this.garageCategoryForm.value.longitude),
            parseFloat(this.garageCategoryForm.value.latitude)
          ]
        }
      };

      this.garageCategoryService.addGarageCategory(newCategory).subscribe(
        (data: GarageCategory) => {
          this.garageCategories.push(data);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  updateGarageCategory(): void {
    if (this.editingCategory && this.garageCategoryForm.valid) {
      const updatedCategory: GarageCategory = {
        ...this.garageCategoryForm.value,
        _id: this.editingCategory._id, // Assuming _id is set for editing
        servicesOffered: this.servicesString.split(',').map(service => service.trim()),
        equipment: this.equipmentsString.split(',').map(equipment => equipment.trim()),
        certifications: this.certificationsString.split(',').map(certification => certification.trim()),
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(this.garageCategoryForm.value.longitude),
            parseFloat(this.garageCategoryForm.value.latitude)
          ]
        }
      };

      this.garageCategoryService.updateGarageCategory(updatedCategory._id, updatedCategory).subscribe(
        (data: GarageCategory) => {
          // Update the category in the local list if needed
          const index = this.garageCategories.findIndex(cat => cat._id === data._id);
          if (index !== -1) {
            this.garageCategories[index] = data;
          }
          this.resetForm();
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }

  deleteCategory(categoryId: string): void {
    this.garageCategoryService.deleteGarageCategory(categoryId).subscribe(
      () => {
        this.garageCategories = this.garageCategories.filter(cat => cat._id !== categoryId);
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  editCategory(category: GarageCategory): void {
    this.editingCategory = category;
    this.isEditing = true;
    this.submitButtonText = 'Update';

    // Populate the form fields with the selected category's data
    this.garageCategoryForm.patchValue({
      name: category.name,
      specialization: category.specialization,
      servicesOffered: category.servicesOffered.join(', '),
      size: category.size,
      equipment: category.equipment.join(', '),
      certifications: category.certifications.join(', '),
      pricingPolicy: category.pricingPolicy,
      customerRelations: category.customerRelations,
      address: category.address,
      city: category.city,
      postalCode: category.postalCode,
      latitude: category.location.coordinates[1].toString(),
      longitude: category.location.coordinates[0].toString()
    });
  }

  resetForm(): void {
    this.garageCategoryForm.reset();
    this.nearbyForm.reset();
    this.servicesString = '';
    this.equipmentsString = '';
    this.certificationsString = '';
    this.editingCategory = null;
    this.isEditing = false;
    this.submitButtonText = 'Submit';
  }

  findNearbyCategories(): void {
    if (this.nearbyForm.valid) {
      const latitude = parseFloat(this.nearbyForm.value.latitude);
      const longitude = parseFloat(this.nearbyForm.value.longitude);
      const distance = parseFloat(this.nearbyForm.value.distance);

      this.garageCategoryService.getNearbyGarageCategories(latitude, longitude, distance).subscribe(
        (data: GarageCategory[]) => {
          this.garageCategories = data;
        },
        (error) => {
          console.error('Error searching nearby categories:', error);
        }
      );
    }
  }
}
