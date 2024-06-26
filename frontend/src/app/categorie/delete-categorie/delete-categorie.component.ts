import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent {
goBack() {
throw new Error('Method not implemented.');
}
  categoryName: string = '';
  searchResults: any[] = []; // Define a variable to store search results

  constructor(private router: Router, private categorieService: CategorieService) { }

  onDeleteCategoryByName() {
    if (!this.categoryName) {
      console.log('Please enter a valid Category Name');
      return;
    }

    this.categorieService.deleteCategorieByNameS(this.categoryName).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.log('Category deleted:', response.message);
          alert(response.message);  // Display the response message
          this.categoryName = '';  // Clear the input field
          this.searchResults = []; // Clear search results after deletion
        } else {
          console.error('Unexpected response:', response);
          alert('Unexpected response from the server. Please try again later.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting category:', error);
        if (error.status === 404) {
          alert('The specified category was not found.');
        } else {
          alert('An error occurred while deleting the category. Please try again later.');
        }
      }
    );
  }
}
