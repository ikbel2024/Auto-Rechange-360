import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  productId: string = '';

  constructor(private router: Router) { }

  onDeleteProduct() {
    // Here you can implement the logic to delete the product using productId
    console.log('Deleting product with ID:', this.productId);
    // Add your logic to delete the product
  }

  goBack() {
    // Navigate back to administration dashboard
    this.router.navigate(['/administration']);
  }
}
