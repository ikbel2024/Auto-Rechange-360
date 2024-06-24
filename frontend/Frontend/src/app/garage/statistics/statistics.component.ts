import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  stats: any = [];

  constructor(private garageService: GarageService) {}
  ngOnInit(): void {
    this.stats = this.garageService.getStatsService();
    console.log(this.stats);

    /*.subscribe(
  (  response: any) => this.villes = response
)*/
  }

  ville: any = {
    name: '',
    count: null,
  };
}
