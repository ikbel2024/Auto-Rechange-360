import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ConsumerProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      dateAdded: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      brandId:  ['', Validators.required],
      category: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      supplierId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        (response: any) => {
          console.log('Product added successfully', response);
          this.router.navigate(['/products']); // Redirect to product list or another page
        },
        (error: any) => {
          console.error('Error adding product:', error);
          if (error instanceof HttpErrorResponse && error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(`Backend returned code ${error.status}, body was:`, error.error);
            if (error.status === 200 && error.error && typeof error.error === 'string' && error.error.startsWith('Product add')) {
              alert('Product added successfully'); // Handle the specific case where the response is not valid JSON
              this.router.navigate(['/products']); // Redirect to product list or another page
            } else {
              alert('An error occurred while adding the product. Please try again later.');
            }
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  goBack(): void {
    this.router.navigate(['/administration']);
  }

}
