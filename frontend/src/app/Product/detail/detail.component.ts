import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { Product } from 'src/app/model/product';  // Adjust the path to your product model

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
buyNow() {
throw new Error('Method not implemented.');
}
  product: Product = new Product(); // Initialize with empty product or appropriate default

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ConsumerProductService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        (data: Product) => {
          this.product = data;
        },
        error => {
          console.error('Error fetching product:', error);
          // Handle error as needed
        }
      );
    } else {
      console.error('Product ID not found in route params');
      // Handle case where product ID is not available
    }
  }

  goBack(): void {
    this.router.navigate(['/product']); // Navigate back to home or product list page
  }
}
