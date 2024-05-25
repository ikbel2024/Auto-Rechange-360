import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
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

  ajouter() {
    console.log(this.registerForm.value);
    //    this.ps.addProduct(this.registerForm.value as any);
    //    this.route.navigate(['product']);
    // //   this.route.navigateByUrl('/product')
    this.consP.addProduct(this.registerForm.value as any).subscribe({
      next: () => this.route.navigateByUrl('/product'),
    });
  }
  goBack() {
    // Navigate back to administration dashboard
    this.route.navigate(['/product']);
  }
}
