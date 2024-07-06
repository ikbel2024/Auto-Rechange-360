import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique.service';
import { Historique } from '../model/historique';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  historiques: Historique[] = [];
  matricule: string = '';
  newHistorique: Historique = {
    date_entered: new Date(),
    release_date: new Date(),
    maintenance_description: '',
    matricule: ''
  };

  constructor(private historiqueService: HistoriqueService) {}

  ngOnInit(): void {
    // Charger éventuellement des données au démarrage
  }

  addHistorique(): void {
    this.historiqueService.addHistorique(this.newHistorique).subscribe(historique => {
      this.historiques.push(historique);
      this.newHistorique = {
        date_entered: new Date(),
        release_date: new Date(),
        maintenance_description: '',
        matricule: ''
      };
    });
  }

  fetchHistoriques(): void {
    if (this.matricule.trim() !== '') {
      this.historiqueService.getMaintenanceDays(this.matricule).subscribe(
        (historiques: Historique[]) => {
          this.historiques = historiques;
        },
        error => {
          console.error('Error fetching historiques:', error);
        }
      );
    }
  }
}
