import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';  // Adjust the import path as necessary

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  productName: string = '';
  searchResults: any[] = []; // Define a variable to store search results

  constructor(private router: Router, private productService: ConsumerProductService) { }

  onDeleteProduct() {
    if (!this.productName) {
      console.log('Please enter a valid Product Name');
      return;
    }

    this.productService.deleteProductByName(this.productName).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.log('Product deleted:', response.message);
          alert(response.message);  // Display the response message
          this.productName = '';  // Clear the input field
          this.searchResults = []; // Clear search results after deletion
        } else {
          console.error('Unexpected response:', response);
          alert('Unexpected response from the server. Please try again later.');
        }
      },
      (error: any) => {
        console.error('Error deleting product:', error);
        if (error.status === 404) {
          alert('The specified product was not found in the inventory.');
        } else {
          alert('An error occurred while deleting the product. Please try again later.');
        }
      }
    );
  }

  onSearchProduct() {
    if (!this.productName) {
      console.log('Please enter a valid Product Name');
      return;
    }

    this.productService.searchProductByName(this.productName).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          console.log('Search results:', response);
          this.searchResults = response; // Assign search results to the variable
        } else {
          console.log('No product found with the specified name:', this.productName);
          alert('No product found with the specified name.');
          this.searchResults = []; // Clear search results if no products found
        }
      },
      (error: any) => {
        console.error('Error searching product:', error);
        alert('An error occurred while searching for the product. Please try again later.');
      }
    );
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
