import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerProductService } from '../services/consumer-product.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {


  constructor(
    private productService: ConsumerProductService,
    private router: Router
  ) { }


  products: any[] = [];
  loading: boolean = false;


  ngOnInit(): void {
    this.loadProducts();  }


  loadProducts(): void {
    this.loading = true; // Indiquer que le chargement a commencé
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log('produit',this.products)
        this.loading = false; // Indiquer que le chargement est terminé
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits:', error);
        this.loading = false; // Indiquer que le chargement est terminé même en cas d'erreur
      }
    );
  }

  getFileNameFromPath(filePath: string) {
    return filePath.split('/').pop();
  }

}
