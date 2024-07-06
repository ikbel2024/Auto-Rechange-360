import { CategorieService } from 'src/app/categorie.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
goBack() {
throw new Error('Method not implemented.');
}
  searchResults: any[] = [];
  searchTerm: string = '';


  constructor(private CategorieService: CategorieService) {}

  search(): void {
    if (this.searchTerm) {
      this.CategorieService.findProduitByName(this.searchTerm).subscribe(
        (response: any) => {
          this.searchResults = [response]; // Wrap the single product in an array
        },
        (error: any) => {
          console.error('Error searching products:', error);
          // Handle error here, e.g., show error message to user
        }
      );
    } else {
      // Handle empty search term, e.g., show message to user
    }
  }

}
