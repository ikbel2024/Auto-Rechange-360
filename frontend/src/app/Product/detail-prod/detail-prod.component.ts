import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';
import { Product } from 'src/app/model/product';


@Component({
  selector: 'app-detail-prod',
  templateUrl: './detail-prod.component.html',
  styleUrls: ['./detail-prod.component.css'],
})
export class DetailProdComponent implements OnInit {
  @Input() p:any
  @Output() notif=new EventEmitter()

  sendDataToParent(){
    this.notif.emit(this.p)
  }
  id!: number;
  product: any;
  listProduct: any;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ConsumerProductService,
    private consumerProductService: ConsumerProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.consumerProductService.getProductById(this.id).subscribe((data: any) => {
      this.product = data;
    });

    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }

  // Add a method to navigate to the update component with the product ID
  updateProduct(id: number): void {
    this.router.navigate(['/update-product', id]);
  }
}
