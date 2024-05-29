import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent {
  router: any;
  goBack() {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }

onDeleteProduct() {
throw new Error('Method not implemented.');
}
productId: any;

}
