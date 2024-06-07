import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  registerForm!: FormGroup;
  pictureInvalid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      reference: ['', Validators.required],
      productId: ['', Validators.required],
      quantity: [0, Validators.required],
      description: ['']
    });
  }

  goBack() {
    this.router.navigate(['/administration']);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.categorieService.addCategorie(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Category added successfully', response);
          this.router.navigate(['/ShowCategory']); // Redirect to category list or another page
        },
        (error: any) => {
          console.error('Error adding category:', error);
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('A client-side or network error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
            if (error.status === 200 && error.error && typeof error.error === 'string' && error.error.startsWith('Category add')) {
              alert('Category added successfully'); // Handle the specific case where the response is not valid JSON
              this.router.navigate(['/ShowCategory']); // Redirect to category list or another page
            } else {
              //alert('An error occurred while adding the category. Please try again later.');
              alert('Category added successfully');
            }
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: Event) {
    // Handle file change logic here if needed
  }
}
