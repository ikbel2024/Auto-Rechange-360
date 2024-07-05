import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js'; // Import correct de Stripe
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css']
})
export class GarageComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  searchTerm: string = "";
  garages: Array<any> = [];
  stripe: Stripe | null = null;
  card: any;

  constructor(private garageService: GarageService) {}

  async ngOnInit(): Promise<void> {
   
    await this.setupStripe();
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

  async setupStripe(): Promise<void> {
    try {
      this.stripe = await loadStripe('pk_test_51PJNMnP0cq6YOYrXF1v8m4I84PMSEurLbMx1HvDzU5IMpf1gIJekaZXS7hCYDbRxuGBf1vwDZXGpppFHj0V5A4g800lXniRT7p');
      if (this.stripe) {
        const elements = this.stripe.elements();
        this.card = elements.create('card');
        this.card.mount('#card-element');
      } else {
        console.error('Stripe.js failed to load.');
      }
    } catch (error) {
      console.error('Error loading Stripe:', error);
    }
  }
  
  async processPayment(garageId: string, montant: number): Promise<void> {
    if (!this.stripe || !this.card) {
      console.error('Stripe.js has not been initialized.');
      return;
    }
  
    try {
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        console.error('Error creating token:', error);
        throw new Error('Error creating token');
      }
  
      this.garageService.initiateStripePayment(montant, token.id).subscribe(
        (response: any) => {
          console.log('Payment initiated successfully:', response);
          alert('Payment successful!');
        },
        (error: any) => {
          console.error('Error initiating payment:', error);
          alert('Error initiating payment. Please try again.');
        }
      );
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again.');
    }
  }
}  