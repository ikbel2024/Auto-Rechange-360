import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  stats: any[] = []; // Assurez-vous que stats est un tableau d'objets

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    this.garageService.getStatsService().subscribe(
      (data: any[]) => {
        this.stats = data; // Assurez-vous que data est bien un tableau d'objets
        console.log('Statistics loaded:', this.stats);
      },
      error => {
        console.error('Error fetching statistics:', error);
        // Gérer l'erreur si nécessaire
      }
    );
  }
}
