import { Component, OnInit } from '@angular/core';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
deleteproduct(arg0: string) {
throw new Error('Method not implemented.');
}
  products: any[] = [];

  constructor(
    private productService: ConsumerProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        console.log('Products loaded successfully', data);
      },
      (error: any) => {
        console.error('Error loading Products:', error);
      }
    );
  }

  deleteProduct(id: string): void {
    // Implement your delete logic here
    console.log('Deleting product with ID:', id);
    // Call your service method to delete the product
    // Example: this.productService.deleteProduct(id).subscribe(...)
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
