import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../../services/garage.service';
import { Garage } from '../../model/garage.model';

@Component({
  selector: 'app-garage-update',
  templateUrl: './garage-update.component.html',
  styleUrl: './garage-update.component.css'
})
export class GarageUpdateComponent implements OnInit {
  id: any = '';
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
    vehiclesUnderRepair: [

    ], 
    __v: 0,
    rating: 0,
    reviews: [],
  }


  
  
  constructor(private activatedRoute : ActivatedRoute, private garageService : GarageService){}
  ngOnInit(){
  this.activatedRoute.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
  this.garage = this.garageService.getGarageByIdService(this.id);
  console.log(this.garage)
}
onSubmit() {
console.log(this.garage)
this.garageService.updateGarageService(this.garage, this.garage._id)
}
}
