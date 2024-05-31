import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  registerForm!: FormGroup;

  constructor(private productService: ConsumerProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Add other form controls here
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const productData = this.registerForm.value;
      this.productService.addProduct(productData).subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          // Handle success (e.g., show success message)
        },
        (error) => {
          console.error('Error adding product:', error);
          // Handle error (e.g., show error message)
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.registerForm.markAllAsTouched();
    }
  }
}
