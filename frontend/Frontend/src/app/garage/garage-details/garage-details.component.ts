import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../../services/garage.service';
import { Appointment } from '../../model/appointment.model';
import { Review } from '../../model/garage.model';

@Component({
  selector: 'app-garage-details',
  templateUrl: './garage-details.component.html',
  styleUrl: './garage-details.component.css'
})
export class GarageDetailsComponent {
failed:boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  id: any = '';
  garage: any
 
  appointment:Appointment=
  {
    firstname : "",
    lastname : "",
    number: "",
    serviceDesired: "",
    timeSlot: ""
  }
  timeSlots: string[] = [];

review:Review = {
  _id: "",
  user: "",
comment: "",
rating: 0
}

constructor(private activatedRoute : ActivatedRoute, private garageService : GarageService){}

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
  this.garageService.getGarageByIdService(this.id).subscribe((data : any) => {
    this.garage = data
  });
  this.timeSlots = this.garageService.getAvailableTimeSlots();
}
onSubmit() {
  this.garageService.bookAppointmentService(this.appointment).subscribe(
    response => {
      console.log('Appointment posted successfully', response);
    },
    error => {
      console.error('There was an error!', error);
      this.failed = true;
      
    }
  )
}

addReview(){
  this.garageService.addReviewService(this.review,this.garage._id);
  /*.subscribe(
    response => {
      console.log('Review posted successfully', response);
    }
  )*/
}
}
