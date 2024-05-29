import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  pictureFile: File | null = null;
  pictureInvalid = false;

  constructor(
    private ps: ProductService,
    private route: Router,
    private consP: ConsumerProductService
  ) {}

  registerForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    quantity: new FormControl('', Validators.required),
    like: new FormControl('', Validators.required),
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.pictureFile = file;
      this.pictureInvalid = false;
    } else {
      this.pictureInvalid = true;
    }
  }

  onSubmit() {
    if (this.registerForm.valid && this.pictureFile) {
      const formData = new FormData();
      formData.append('id', this.registerForm.get('id')?.value || '');
      formData.append('title', this.registerForm.get('title')?.value || '');
      formData.append('price', this.registerForm.get('price')?.value || '');
      formData.append('quantity', this.registerForm.get('quantity')?.value || '');
      formData.append('like', this.registerForm.get('like')?.value || '');
      formData.append('picture', this.pictureFile);


  }


  }
  goBack() {
    this.route.navigate(['/administration']);
  }
}
