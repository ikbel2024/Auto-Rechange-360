import { Component, OnInit } from '@angular/core';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';

@Component({
  selector: 'app-count-product',
  templateUrl: './count-product.component.html',
  styleUrls: ['./count-product.component.css']
})
export class CountProductComponent implements OnInit {
  countResult: number = 0;
  selectedCategory: string = '';
  router: any;
categories: any;

  constructor(private productService: ConsumerProductService) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onCountByCategory(event: Event) {
    event.preventDefault();
    if (this.selectedCategory) {
      this.productService.countProductsByCategory(this.selectedCategory).subscribe(
        (result: { count: number }) => {
          this.countResult = result.count;
        },
        (error) => {
          console.error('Error counting products by category:', error);
        }
      );
    }
  }
  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
