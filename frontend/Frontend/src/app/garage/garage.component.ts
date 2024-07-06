import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../services/garage.service';
import { Garage } from '../model/garage.model';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  searchTerm: string = "";
  garages: Array<any> = [];

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    this.fetchGarages();
  }

  search() {
    throw new Error('Method not implemented.');
  }

  get filteredGarage() {
    return this.garages.filter(item => 
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  fetchGarages(): void {
    this.garageService.getAllGarageService().subscribe((data: any[]) => {
      this.garages = data;
      console.log(data);
    });
  }

  deleteGarage(id: string): void {
    this.garageService.deleteGarage(id).subscribe(
      (response: any) => {
        console.log('Garage deleted successfully', response);
        this.garages = this.garages.filter(garage => garage._id !== id);
      },
      (error: any) => {
        console.error('Error deleting garage:', error);
      }
    );
  }

  processPayment(garageId: string, amount: number, token: string): void {
    this.garageService.initiateStripePayment(amount, token).subscribe(
      (response: any) => {
        console.log('Payment initiated successfully:', response);
        alert('Payment successful!');
      },
      (error: any) => {
        console.error('Error initiating payment:', error);
        alert('Payment failed. Please try again.');
      }
    );
  }
}
