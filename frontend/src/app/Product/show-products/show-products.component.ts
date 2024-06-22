import { Component, OnInit } from '@angular/core';
import { ConsumerProductService } from '../../services/consumer-product.service'; // Adjust the import path if necessary
import { Router } from '@angular/router';
import { Product } from '../../model/product'; // Ensure you have a Product model

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
  products: Product[] = []; // Adjusted to be an array of Product

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
}
