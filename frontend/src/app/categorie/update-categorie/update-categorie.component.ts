import { Component } from '@angular/core';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent {
  router: any;
  goBack() {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }
  Categorie: any;

}
