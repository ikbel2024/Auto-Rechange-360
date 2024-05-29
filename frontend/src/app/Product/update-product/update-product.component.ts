import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product'; // Import your Product model if not already imported

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product: Product = new Product(); // Declare product property

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Fetch the product details based on the route parameter (product ID)
      // For example, you might want to fetch the product details from a service
      // and assign them to the 'product' property
    });
  }

  goBack() {
    this.router.navigate(['/administration']); // Navigate back to the administration dashboard
  }
}
