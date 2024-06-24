import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment.model';
import { Garage, Review } from '../model/garage.model';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private readonly BASE_URL: string = 'http://localhost:4000/garage';
  garages = [
    {
      _id: '665513a4c9124fe55b33d015',
      name: 'Mon Garage',
      address: '123 Rue des Mécaniciens',
      city: 'Villeville',
      postalCode: '12345',
      phone: '123-456-7890',
      email: 'contact@mongarage.com',
      openingHours: 'Lun - Ven : 8h00 - 18h00',
      servicesOffered: ['Réparations', 'Entretien', 'Pneumatiques'],
      employees: [
        {
          name: 'Jean Dupont',
          position: 'Mécanicien',
          phone: '111-222-3333',
          email: 'jean.dupont@example.com',
          _id: '665513a4c9124fe55b33d016',
        },
        {
          name: 'Marie Leclerc',
          position: 'Réceptionniste',
          phone: '444-555-6666',
          email: 'marie.leclerc@example.com',
          _id: '665513a4c9124fe55b33d017',
        },
      ],
      vehiclesUnderRepair: [
        {
          model: 'Corolla',
          year: 2012,
          owner: 'Alice Martin',
          licensePlate: 'XYZ560',
          issues: 'Problème de freins',
          _id: '665513a4c9124fe55b33d018',
        },
      ],
      __v: 4,
      rating: 4,
      reviews: [
        {
          rating: 4,
          comment: 'Excellent service, personnel très compétent.',
          user: null,
          _id: '665525b2f5ca2baeadd55cf6',
        },
        {
          rating: 4,
          comment: 'Excellent service, je recommande vivement ce garage.',
          user: null,
          _id: '665b2e61587c168a07c5b740',
        },
        {
          rating: 4,
          comment: 'Excellent service, je recommande vivement ce garage.',
          user: null,
          _id: '665b2fd7587c168a07c5b750',
        },
        {
          rating: 4,
          comment: 'Excellent service, je recommande vivement ce garage.',
          user: null,
          _id: '66760c67f7782ba6ab5624bc',
        },
      ],
    },
  ];

  timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
  ];

  stats = [
    {ville: 'Tataouine', count: 13 },
    {ville : 'Monastir', count : 24},
    {ville : 'Tunis', count : 42},
    {ville : 'Bizerte', count : 33},

];

  constructor(private http: HttpClient) {}

  getAllGarageService():Observable<any>
  {
    
    return this.http.get(this.BASE_URL+'/show')
  }
  getGarageByIdService(index: string): any {
    //let garage = this.garages.filter((garage) => garage._id == index);
    //return garage[0];
    return this.http.get(`${this.BASE_URL}/getbyid/${index}`)
  }
  bookAppointmentService(appointment: Appointment): Observable<any> {
    console.log(appointment);
    return this.http.post(this.BASE_URL, appointment);
  }
  getAvailableTimeSlots() {
    return this.timeSlots;
  }

  deleteGarageService(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/garage/${id}`);
  }

  updateGarageService(garage: Garage, id: any): Observable<any> {
    let updatedGarage = JSON.stringify(garage)
    console.log(updatedGarage + "\nid "+ id)
    return this.http.put(`${this.BASE_URL}/update/${id}`, updatedGarage);
  }

  addReviewService(review: any,id:any): any //:Observable<any>
  {
    //this.garages[0].reviews.push(review);
    console.log(id,review)
    return this.http.post(`${this.BASE_URL}/${id}/addReview`, review);
  }
addGarageService(garage: Garage){
  let added = JSON.stringify(garage);
  console.log("added", added)
  //this.garages.push(garage)
}
  getStatsService() {
    return this.stats;
    //return this.http.get(this.BASE_URL)
  }
}
