import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-show-categorie',
  templateUrl: './show-categorie.component.html',
  styleUrls: ['./show-categorie.component.css']
})
export class ShowCategorieComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log('Categories loaded successfully', data);
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  deleteCategorie(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          console.log('Category deleted successfully');
          this.router.navigate(['/ShowCategorie']);
          // After deletion, reload the categories to reflect the changes
          this.loadCategories();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting category:', error);

          // Handle error as needed
          if (error.status === 404) {
            alert('Category not found.');
          } else {
            //alert('An error occurred while deleting the category. Please try again later.');
            this.router.navigate(['/ShowCategorie']);
          }
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
