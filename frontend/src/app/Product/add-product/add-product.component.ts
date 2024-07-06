import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumerProductService } from 'src/app/services/consumer-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  dataFile: File | null = null;

  brand_Id = '123';
  supplierId = '1234';

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

  ngOnInit(): void { }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.dataFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const produitData: any = {
        name: this.productForm.value.name,
        reference: this.productForm.value.reference,
        dateAdded: this.productForm.value.dateAdded,
        price: this.productForm.value.price,
        brandid: this.brand_Id,
        supplierId: this.supplierId,
        description: this.productForm.value.description,
        category: this.productForm.value.category,
        stockQuantity: this.productForm.value.stockQuantity,
      };

      const formData = new FormData();
      Object.keys(produitData).forEach(key => {
        if (typeof produitData[key] === 'object' && produitData[key] !== null) {
          formData.append(key, JSON.stringify(produitData[key]));
        } else {
          formData.append(key, produitData[key]);
        }
      });

      // Ajouter l'image à FormData si disponible
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }

      // Log FormData values explicitly
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      this.productService.addProduit(formData).subscribe(
        (response) => {
          console.log('Add product response:', response);
          this.router.navigate(['/administration']); // Navigate after successful submission
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
