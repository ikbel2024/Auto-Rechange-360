import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Adjust the import path if necessary
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../model/product'; // Ensure you have a Product model

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
  products: any; // Using an observable directly

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
