import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerProductService } from '../services/consumer-product.service';
import { Vehicule } from '../model/vehicule';
import { VehiculeService } from '../services/vehicule.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  vehicules: Vehicule[] = [];
  modeleCount: { [key: string]: number } = {};
  products: any[] = [];
  loading: boolean = false;

  constructor(
    private productService: ConsumerProductService,
    private vehiculeService: VehiculeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadVehicules();
  }

  calculateModeleCount(): void {
    this.vehicules.forEach((vehicule) => {
      if (this.modeleCount[vehicule.modele]) {
        this.modeleCount[vehicule.modele]++;
      } else {
        this.modeleCount[vehicule.modele] = 1;
      }
    });
  }

  getProgressValue(modele: string): number {
    const count = this.modeleCount[modele] || 0;
    const total = this.vehicules.length;
    return (count / total) * 100;
  }

  getProgressWidth(modele: string): string {
    return this.getProgressValue(modele) + '%';
  }

  loadVehicules(): void {
    this.vehiculeService.getVehicules().subscribe(
      (data: Vehicule[]) => {
        this.vehicules = data;
        this.calculateModeleCount();
      },
      error => {
        console.error('Error fetching vehicules:', error);
      }
    );
  }

  loadProducts(): void {
    this.loading = true; // Indicate that loading has started
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.loading = false; // Indicate that loading has finished
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false; // Indicate that loading has finished even in case of error
      }
    );
  }




  getFileNameFromPath(filePath: string) {
    return filePath.split('/').pop();
  }

}
