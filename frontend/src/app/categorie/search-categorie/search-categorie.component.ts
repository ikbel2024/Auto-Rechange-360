import { Component } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-search-categorie',
  templateUrl: './search-categorie.component.html',
  styleUrls: ['./search-categorie.component.css']
})
export class SearchCategorieComponent {
  searchResults: any[] = [];
  searchTerm: string = '';
  router: any;

  constructor(private categorieService: CategorieService) {}

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.categorieService.getCategorieByName(this.searchTerm).subscribe(
        (data: any) => {
          this.searchResults = Array.isArray(data) ? data : [data];
        },
        (error: any) => {
          console.error('Error searching categories:', error);
          // Handle error
        }
      );
    } else {
      this.searchResults = [];
    }
  }


  goBack(): void {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }
}
