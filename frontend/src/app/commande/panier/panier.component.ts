import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
   items: any[] = [];
  totalProduits: number = 0;
  deliveryFee: number = 5.00; // Example delivery fee
  freeDeliveryThreshold: number = 50.00; // Example threshold for free delivery

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.commandeService.getCartItems().subscribe((items: any[]) => {
      this.items = items;
      this.totalProduits = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, error => {
      console.error(error);
    });
  }

  loadCartItems(): void {
    this.commandeService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalProduits = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity < item.stock) {
      this.commandeService.updateCartItemQuantity(item.id, item.quantity + 1).subscribe(() => {
        item.quantity++;
        this.calculateTotal();
      });
    }
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.commandeService.updateCartItemQuantity(item.id, item.quantity - 1).subscribe(() => {
        item.quantity--;
        this.calculateTotal();
      });
    }
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    this.commandeService.removeCartItem(item.id).subscribe(() => {
      this.cartItems.splice(index, 1);
      this.calculateTotal();
    });
  }

  emptyCart(): void {
    this.cartItems.forEach(item => {
      this.commandeService.removeCartItem(item.id).subscribe(() => {
        this.cartItems = [];
        this.calculateTotal();
      });
    });
  }

  checkout(): void {
    const orderData = {
      items: this.cartItems,
      total: this.totalProduits + this.deliveryFee
    };
    this.commandeService.checkout(orderData).subscribe(response => {
      console.log('Order placed successfully:', response);
    });
  }
}
