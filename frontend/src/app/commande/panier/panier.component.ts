import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  totalProduits = 0;
  deliveryFee = 5; // Exemple de frais de livraison
  freeDeliveryThreshold = 50; // Seuil pour la livraison gratuite
  commandeConfirmee = false;
  commandeEnLivraison = false;
  commandeLivre = false;
  nom: string = '';
  adresse: string = '';

  constructor(private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = [
      { id: 1, name: 'Produit 1', price: 10, quantity: 2, stock: 5, outOfStock: false },
      { id: 2, name: 'Produit 2', price: 15, quantity: 1, stock: 3, outOfStock: false },
      { id: 3, name: 'Produit 3', price: 20, quantity: 3, stock: 2, outOfStock: false }
    ];

    this.calculateTotalProduits();
  }

  calculateTotalProduits() {
    this.totalProduits = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.cartItems.splice(index, 1);
      this.calculateTotalProduits();
    }
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity < item.stock) {
      item.quantity += 1;
      item.outOfStock = false;
      this.calculateTotalProduits();
    } else {
      this.showNotification('Quantité maximale atteinte pour cet article.');
    }
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotalProduits();
    } else {
      this.removeItem(index);
    }
  }

  emptyCart(): void {
    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
      this.cartItems = [];
      this.calculateTotalProduits();
    }
  }

  showNotification(message: string): void {
    alert(message); 
  }

  checkout(): void {
    if (this.cartItems.length > 0 && this.totalProduits > 0) {
      this.confirmCommande();
    this.router.navigate(['/commande-info']);
    } else {
      this.showNotification('Votre panier est vide.');
    }
  }

  confirmCommande(): void {
    this.commandeConfirmee = true;
  }

  annulerCommande(): void {
    this.commandeConfirmee = false;
  }

  confirmerReception(): void {
    this.commandeEnLivraison = false;
    this.commandeLivre = true;
  }

  telechargerRecu(): void {
    alert('Téléchargement du reçu de paiement en cours...');
  }
}
