import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  categorie: any;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categorieService: CategorieService
  ) {
    this.categorie = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.categorieService.getCategorieById(id).subscribe(
        data => {
          this.categorie = data;
        },
        error => {
          console.error('Error fetching category details:', error);
          this.errorMessage = 'Error fetching category details. Please try again later.';
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.categorieService.updateCategorie(this.categorie._id, this.categorie).subscribe(
        (response: any) => {
          console.log('Category updated successfully', response);
          this.router.navigate(['/administration']); // Redirect to administration dashboard or another page
        },
        (error: any) => {
          console.error('Error updating category:', error);
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            console.error('A client-side or network error occurred:', error.error.message);
          } else {
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
            if (error.status === 200 && error.error && typeof error.error === 'string' && error.error.startsWith('Category update')) {
              alert('Category updated successfully'); // Handle the specific case where the response is not valid JSON
              this.router.navigate(['/administration']); // Redirect to administration dashboard or another page
            } else {
              alert('An error occurred while updating the category. Please try again later.');
            }
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
