import { Component } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-commande-info',
  templateUrl: './commande-info.component.html',
  styleUrls: ['./commande-info.component.css']
})
export class CommandeInfoComponent {
  nom: string = '';
  adresse: string = '';
  telephone: string = '';
  methodePaiement: string = 'carte';

  constructor(private commandeService: CommandeService) { }

  validerCommande(): void {
    const orderData = {
      nom: this.nom,
      adresse: this.adresse,
      telephone: this.telephone,
      methodePaiement: this.methodePaiement
    };
    this.commandeService.checkout(orderData).subscribe(response => {
      console.log('Order confirmed:', response);
    });
  }
}
