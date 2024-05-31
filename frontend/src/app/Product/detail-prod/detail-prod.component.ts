import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerProductService } from '../../services/consumer-product.service';

@Component({
  selector: 'app-detail-prod',
  templateUrl: './detail-prod.component.html',
  styleUrls: ['./detail-prod.component.css'],
})
export class DetailProdComponent implements OnInit {
  id!: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consumerProductService: ConsumerProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.consumerProductService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/administration']);
  }
}
