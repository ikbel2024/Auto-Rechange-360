import { Component } from '@angular/core';

@Component({
  selector: 'app-count-categorie',
  templateUrl: './count-categorie.component.html',
  styleUrls: ['./count-categorie.component.css']
})
export class CountCategorieComponent {
selectedCategory: any;
countResult: any;
selectedManufacturer: any;
onCountByCategory() {
throw new Error('Method not implemented.');
}
  router: any;
  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
