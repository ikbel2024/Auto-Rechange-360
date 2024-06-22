import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-ordre',
  templateUrl: './ordre.component.html',
  styleUrls: ['./ordre.component.css']
})
export class OrdreComponent implements OnInit {
  currentStep = 1; // Étape de commande actuelle
  client = 'John Doe'; // Exemple de données statiques pour le client
  adresse = '123 Rue Principale';
  telephone = '+1234567890';
  methodePaiement = 'Carte de crédit';
  cartItems: any[] = []; // Modèle de données de produits à adapter
  totalProduits = 0; // Total des produits
  fraisLivraison = 10; // Frais de livraison
  totalCommande = 0; // Total de la commande

  constructor(private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.getCartItems();
  }
public telechargerRecu() {
alert("telechargerRecu");  }
   public confirmerReception() {
alert("confirmerReception");  }

  getCartItems() {
    // Assurez-vous que votre CommandeService a bien une méthode getCartItems()
    this.commandeService.getCartItems().subscribe((items: any[]) => {
      // Traitement des items récupérés du panier
    }, error => {
      console.error('Erreur lors de la récupération du panier:', error);
    });
  }

  calculateTotals() {
    this.totalProduits = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.totalCommande = this.totalProduits + this.fraisLivraison;
  }

  submitOrder() {
    const commande = {
      client: this.client,
      adresseLivraison: this.adresse,
      telephone: this.telephone,
      methodePaiement: this.methodePaiement,
      produits: this.cartItems,
      total: this.totalCommande
    };

    this.commandeService.createCommande(commande).subscribe((response: any) => {
      console.log('Commande soumise avec succès:', response);
      this.currentStep++;
    }, error => {
      console.error('Erreur lors de la soumission de la commande:', error);
    });
  }

  annulerCommande() {
    // Supposons que vous ayez besoin d'un identifiant de commande pour annuler, à remplacer par la logique appropriée
    const commandeId = ''; // Remplacer par la logique pour obtenir l'ID de la commande en cours
    this.commandeService.annulerCommande(commandeId).subscribe(() => {
      alert('Commande annulée avec succès.');
      this.currentStep = 1;
      this.cartItems = [];
      this.calculateTotals();
    }, error => {
      console.error('Erreur lors de l\'annulation de la commande:', error);
    });
  }

  retournerProduit() {
    // Supposons que vous ayez besoin d'un identifiant de produit et d'un motif pour le retour, à remplacer par la logique appropriée
    const produitId = ''; // Remplacer par l'ID du produit à retourner
    const motif = ''; // Remplacer par le motif du retour
    this.commandeService.retournerProduit(produitId, motif).subscribe(() => {
      alert('Produit retourné avec succès.');
      // Logique pour gérer le retour d'un produit
    }, error => {
      console.error('Erreur lors du retour du produit:', error);
    });
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
