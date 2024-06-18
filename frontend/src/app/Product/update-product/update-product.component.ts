import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerProductService } from '../../services/consumer-product.service'; // Adjust the path if necessary
import { Product } from '../../model/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;  // Declare the productForm property
  product: Product = new Product();  // Initialize product with a new instance

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ConsumerProductService // Use your existing service
  ) {
    this.productForm = this.createForm();  // Initialize productForm in the constructor
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.fetchProduct(productId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      dateAdded: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      category: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      supplierId: ['', Validators.required],
    });
  }

  fetchProduct(id: number) {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
        this.productForm.patchValue(this.product);
      },
      (error) => {
        console.error('Error fetching product', error);
      }
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      this.productService.updateProduct(updatedProduct, this.product.id).subscribe(
        (response) => {
          console.log('Product updated successfully');
          this.router.navigate(['/ShowProucts']);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/administration']);
  }
}
