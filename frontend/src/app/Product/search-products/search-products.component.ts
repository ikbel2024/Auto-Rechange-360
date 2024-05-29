import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
  goBack(): void {
    this.router.navigate(['/administration']);
  }
  searchResults: any;
  searchTerm: any;

  constructor(private router: Router) {}

  search(arg0: any) {
    throw new Error('Method not implemented.');
  }


}
