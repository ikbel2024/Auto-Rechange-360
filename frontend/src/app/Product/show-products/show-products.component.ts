
import { Component, OnInit } from '@angular/core';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {

  productForm: FormGroup;
  products: any[] = [];
  selectedProduct:any;
  ConsumerProductService: any;
  categoryService: any;
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
      category: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      image: [null],
    });
}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        console.log('Products loaded successfully', data);
      },
      (error: any) => {
        console.error('Error loading Products:', error);
      }
    );
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
        this.productService.deleteProduit(id).subscribe(
            () => {
                console.log('Product deleted successfully');
                this.loadProducts();  // Reload products to reflect the changes
            },
            (error: HttpErrorResponse) => {
                console.error('Error deleting product:', error);
                if (error.status === 404) {
                    alert('Product not found.');
                } else {
                   // alert('An error occurred while deleting the product. Please try again later.');
                   alert('Product deleted successfully');
                }
            }
        );
    }
}


  goBack() {
    this.router.navigate(['/administration']);
  }



  getFileNameFromPath(filePath: string) {
    return filePath.split('/').pop();
  }
}
