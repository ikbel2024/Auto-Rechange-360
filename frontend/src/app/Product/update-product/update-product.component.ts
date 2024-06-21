import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service'; // Adjust the path if necessary
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  Product: any; // Adjust to match your product model/interface
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ConsumerProductService
  ) {
    this.Product = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Removed the + sign to keep productId as string
      this.productService.getProductById(id).subscribe(
        data => {
          this.Product = data;
        },
        error => {
          console.error('Error fetching product details:', error);
          this.errorMessage = 'Error fetching Product details. Please try again later.';
        }
      );
    });
  }
  goBack() {
    this.router.navigate(['/administration']); // Navigate back to administration dashboard
  }

  onSubmit(): void {
    if (this.Product) {
      this.productService.updateProduct(this.Product._id,this.Product).subscribe(
        (response: any) => {
          console.log('Product updated successfully', response);
          alert('Product updated successfully'); // Notify user of successful update
          this.router.navigate(['/administration']); // Redirect to administration dashboard or another page
        },
        (error: any) => {
          console.error('Error updating product:', error);
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            console.error('A client-side or network error occurred:', error.error.message);
          } else {
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
            alert('An error occurred while updating the product. Please try again later.');
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


}
