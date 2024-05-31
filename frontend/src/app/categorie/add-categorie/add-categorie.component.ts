import { Component } from '@angular/core';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  router: any;
  goBack() {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }

onSubmit() {
throw new Error('Method not implemented.');
}
pictureInvalid: any;
registerForm: any;
onFileChange($event: Event) {
throw new Error('Method not implemented.');
}

}
