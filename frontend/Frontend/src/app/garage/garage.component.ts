import { Component } from '@angular/core';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css'
})
export class GarageComponent {
  stars: number[] = [1, 2, 3, 4, 5];

  searchTerm: string = "";
  search() {
  throw new Error('Method not implemented.');
  }
    get filteredGarage() {
      return this.garages.filter(item => 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    garages: Array<any> = [];
    constructor(private garageService: GarageService) {}
    ngOnInit(): void {
       this.garageService.getAllGarageService().subscribe((data: any[]) => {
        this.garages = data;
        console.log(data);
      });
    
    }
    deleteGarage(id:string) {
    this.garageService.deleteGarageService(id).subscribe(
      response => {
        console.log('Appointment deleted successfully', response);
      },
      error => {
        console.error('There was an error!', error);
      }
    )
    }
}
