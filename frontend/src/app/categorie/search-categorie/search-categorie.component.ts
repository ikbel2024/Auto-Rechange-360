import { Component } from '@angular/core';

@Component({
  selector: 'app-search-categorie',
  templateUrl: './search-categorie.component.html',
  styleUrls: ['./search-categorie.component.css']
})
export class SearchCategorieComponent {
searchResults: any;
  router: any;
search(arg0: any) {
throw new Error('Method not implemented.');
}
searchTerm: any;
goBack() {
  this.router.navigate(['/administration']); // Navigate back to the administration dashboard
}

}
