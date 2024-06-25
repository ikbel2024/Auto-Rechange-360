import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-count-product',
  templateUrl: './count-product.component.html',
  styleUrls: ['./count-product.component.css']
})
export class CountProductComponent implements OnInit {
  countResult: number | null = null;
  selectedCategory: string = '';

  constructor(private productService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onCountByCategory(event: Event) {
    event.preventDefault();
    if (this.selectedCategory) {
      console.log('Attempting to count products by category:', this.selectedCategory); // Log before HTTP request
      this.productService.countProductsByCategory(this.selectedCategory).subscribe(
        (result: { count: number }) => {
          console.log('Successful count result:', result); // Log successful result
          this.countResult = result.count;
        },
        (error: any) => {
          console.error('Error counting products by category:', error); // Log error
        }
      );
    } else {
      console.warn('Selected category is empty.'); // Log if no category selected
    }
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
