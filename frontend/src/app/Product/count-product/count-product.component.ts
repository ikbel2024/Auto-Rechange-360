import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategorieService } from './../../categorie.service';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-count-product',
  templateUrl: './count-product.component.html',
  styleUrls: ['./count-product.component.css']
})
export class CountProductComponent implements OnInit, OnDestroy {

  countResult: number | null = null;
  selectedCategory: string = '';
  subscriptions: Subscription[] = [];

  constructor(private categorieService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    this.onCountAllProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCountAllProducts(): void {
    this.subscriptions.push(
      this.categorieService.countAllProducts()
        .pipe(
          catchError(error => {
            console.error('Error counting all products:', error);
            return throwError(error);
          })
        )
        .subscribe(
          (data: { count: number }) => {
            this.countResult = data.count;
          }
        )
    );
  }

  onCountByCategory(): void {
    if (!this.selectedCategory) {
      console.error('Category not selected');
      return;
    }

    this.subscriptions.push(
      this.categorieService.countProductsByCategory(this.selectedCategory)
        .pipe(
          catchError(error => {
            console.error('Error counting products by category:', error);
            return throwError(error);
          })
        )
        .subscribe(
          (data: { count: number }) => {
            this.countResult = data.count;
          }
        )
    );
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
