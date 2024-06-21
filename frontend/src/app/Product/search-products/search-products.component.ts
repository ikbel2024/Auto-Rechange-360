import { Component } from '@angular/core';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';


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


  constructor(private productService: ConsumerProductService) {}

  search(): void {
    if (this.searchTerm) {
      this.productService.findProduitName(this.searchTerm).subscribe(
        (response) => {
          this.searchResults = [response]; // Wrap the single product in an array

        },
        (error) => {
          console.error('Error searching products:', error);
          // Handle error here, e.g., show error message to user
        }
      );
    } else {
      // Handle empty search term, e.g., show message to user
    }
  }
}
