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


  }

  onSearchProduct() {
    if (!this.productName) {
      console.log('Please enter a valid Product Name');
      return;
    }


  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
