import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-info',
  templateUrl: './commande-info.component.html',
  styleUrls: ['./commande-info.component.css']
})
export class CommandeInfoComponent {
  nom: string = '';
  adresse: string = '';
  telephone: string = '';
  methodePaiement: string = '';

  constructor(private router: Router) {}

  validerCommande(): void {
    // Logique pour valider les informations de commande (exemple statique)
    // Vous pouvez envoyer les données à un service, enregistrer en base de données, etc.
    this.router.navigate(['/ordre']); // Redirection vers l'étape suivante
  }
}
