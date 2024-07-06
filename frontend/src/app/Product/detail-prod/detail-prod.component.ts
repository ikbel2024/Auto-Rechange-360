import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
//import { ConsumerProductService } from '../../services/consumer-product.service';
import { Product } from 'src/app/model/product';  // Adjust the path to your product model

@Component({
  selector: 'app-detail-prod',
  templateUrl: './detail-prod.component.html',
  styleUrls: ['./detail-prod.component.css'],
})
export class DetailProdComponent implements OnInit {
[x: string]: any;
  @Input() p: any;
  @Output() notif = new EventEmitter();

  id!: string; // Adjust type based on your backend API

  product!: Product; // Adjust type based on your product model
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    //private productService: ConsumerProductService,
   // private consumerProductService: ConsumerProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; // Assuming id is a string, adjust if it's a number
    this.categorieService.getProductById(this.id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (      error: any) => {
        console.error('Error fetching product:', error);
      }
    );

    this.categorieService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }

  updateProduct(id: string): void {
    this.router.navigate(['/update-product', id]);
  }
}
