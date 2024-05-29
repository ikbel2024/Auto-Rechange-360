import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-count-product',
  templateUrl: './count-product.component.html',
  styleUrls: ['./count-product.component.css']
})
export class CountProductComponent {
countResult: any;
selectedCategory: any;
onCountByCategory() {
throw new Error('Method not implemented.');
}
  @Input() count: number = 0;

  constructor(private router: Router) {} // Inject Router module

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
