import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';

@Component({
  selector: 'app-show-categorie',
  templateUrl: './show-categorie.component.html',
  styleUrls: ['./show-categorie.component.css']
})
export class ShowCategorieComponent implements OnInit {
deleteCategorie(arg0: any) {
throw new Error('Method not implemented.');
}
  categories: any[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categorieService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        console.log('Categories loaded successfully', data);
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
