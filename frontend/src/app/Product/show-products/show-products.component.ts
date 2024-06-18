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
  products: Product[] = [];

  constructor(
    private productService: ConsumerProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }

  // Add a method to navigate to the update component with the product ID
  updateProduct(id: number): void {
    this.router.navigate(['/update-product', id]);
  }
}
