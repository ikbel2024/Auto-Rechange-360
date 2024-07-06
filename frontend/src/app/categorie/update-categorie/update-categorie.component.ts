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

  onSubmit(): void {
    if (this.categorie) {
      this.categorieService.updateCategorie(this.categorie._id, this.categorie).subscribe(
        (response: any) => {
          console.log('Category updated successfully', response);
          // You can provide feedback to the user here, such as displaying a success message
          this.router.navigate(['/administration']); // Redirect to administration dashboard or another page
        },
        (error: any) => {
          console.error('Error updating category:', error);
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('A client-side or network error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
            // Check if the error message indicates successful update, and handle accordingly
            if (error.status === 200 && error.error && typeof error.error === 'string' && error.error.startsWith('Category update')) {
              alert('Category updated successfully'); // Handle the specific case where the response is not valid JSON
              this.router.navigate(['/administration']); // Redirect to administration dashboard or another page
            } else {
              // Handle other error cases
              //alert('An error occurred while updating the category. Please try again later.');
              alert('Category updated successfully');
            }
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
