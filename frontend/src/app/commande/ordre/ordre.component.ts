import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['./ordre.component.css']
})
export class OrdreComponent implements OnInit {
  currentStep: number = 1;
  client: string = '';
  adresse: string = '';
  telephone: string = '';
  methodePaiement: string = '';
  cartItems: any[] = [];
  totalProduits: number = 0;
  fraisLivraison: number = 5.00;
  totalCommande: number = 0;
  commandeConfirmee: boolean = false;
  commandeEnLivraison: boolean = false;
  commandeLivre: boolean = false;

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    // Charger les informations de la commande depuis l'API
    // Vous pouvez adapter cette partie selon votre logique de commande
  }

  confirmerReception(): void {
    this.currentStep = 3;
  }

  annulerCommande(): void {
    // Logique pour annuler la commande
    console.log('Commande annulée');
  }

  telechargerRecu(): void {
    // Logique pour télécharger le reçu
    console.log('Reçu téléchargé');
  }
}
