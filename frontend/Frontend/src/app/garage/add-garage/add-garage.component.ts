import { Component, OnInit } from '@angular/core';
import { Garage } from '../../model/garage.model';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrl: './add-garage.component.css'
})
export class AddGarageComponent {
constructor(private garageService: GarageService){}
  garage : Garage = {
    _id: "",
    name: "",
    address: "",
    city: "",
    postalCode: 1234,
    phone: "",
    email: "",
    openingHours: "",
    servicesOffered: [],
    employees: [
      {
        name:"",
        position: "",
        phone: "",
        email:  "",
        _id:  ""
      }
      ],
    vehiclesUnderRepair: [], 
    __v: 0,
    rating: 0,
    reviews: [],
  }


onSubmit() {
console.log(this.garage)
this.garageService.addGarageService(this.garage)
};

}
