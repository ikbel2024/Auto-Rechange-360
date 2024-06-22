import { Component } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'app-show-categorie',
  templateUrl: './show-categorie.component.html',
  styleUrls: ['./show-categorie.component.css']
})
export class ShowCategorieComponent {
  router: any;
  categories: Observable<undefined> | Subscribable<undefined> | Promise<undefined> | undefined;
  goBack() {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }


}
