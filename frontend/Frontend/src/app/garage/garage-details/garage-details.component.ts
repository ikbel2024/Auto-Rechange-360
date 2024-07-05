import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarageService } from '../../services/garage.service';
import { Appointment } from '../../model/appointment.model';
import { Review, Garage } from '../../model/garage.model';



@Component({
  selector: 'app-garage-details',
  templateUrl: './garage-details.component.html',
  styleUrls: ['./garage-details.component.css']
})
export class GarageDetailsComponent implements OnInit {
  
  
  

  failed: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  id: string = '';
  garage!: Garage; // Utilisation de l'interface Garage pour le typage
  garageId: string = '';

  appointment: Appointment = {
    clientName: '',
    clientPhone: '',
    appointmentDate: new Date(),
    serviceRequired: '',
    garage: '',
    timeSlot: '',
  };
  timeSlots: string[] = [];

  review: Review = {
    _id: '',
    user: '',
    comment: '',
    rating: 0,
    garage:''

  };

  constructor(private activatedRoute: ActivatedRoute, private garageService: GarageService) {}

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.loadGarageDetails(this.id);
    });
    this.timeSlots = this.garageService.getAvailableTimeSlots();
  }
  

  loadGarageDetails(id: string): void {
    this.garageService.getGarageById(id).subscribe(
      (data: Garage) => {
        this.garage = data;
      },
      error => {
        console.error('Error fetching garage details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.id) {
      this.appointment.garage = this.id;
      this.garageService.bookAppointment(this.id, this.appointment).subscribe(
        response => {
          console.log('Appointment posted successfully', response);
        },
        error => {
          console.error('There was an error!', error);
          this.failed = true;
        }
      );
    } else {
      console.error('Garage ID is missing.');
    }
  }

  addReview(): void {
    if (this.garage && this.garage._id) {
      this.review.garage = this.garage._id;
      this.garageService.addReview(this.garage._id, this.review).subscribe(
        response => {
          console.log('Review posted successfully', response);
          // Optionally, refresh the garage details or handle the response
        },
        error => {
          console.error('Error adding review:', error);
        }
      );
    } else {
      console.error('Garage ID is missing.');
    }
  }
}
