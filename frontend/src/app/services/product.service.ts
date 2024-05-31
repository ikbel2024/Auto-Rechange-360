import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductById(id: number) {
    throw new Error('Method not implemented.');
  }
  searchProducts(searchTerm: string): import("rxjs").Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  getProducts() {
    throw new Error('Method not implemented.');
  }



   listProduct=[
    {
      id:1,
      title:"Iphone 12",
      price:200,
      quantity:2,
      like:0
    },
    {
      id:2,
      title:"Iphone 11",
      price:150,
      quantity:0,
      like:0
    },
    {
      id:3,
      title:"Iphone X",
      price:100,
      quantity:0,
      like:0
    },
    {
      id:4,
      title:"Iphone 8",
      price:120,
      quantity:1,
      like:0
    },
    {
      id:5,
      title:"Iphone 7",
      price:180,
      quantity:1,
      like:0
    },
  ]

  constructor() { }
/*
  addProduct(p:Product){
    this.listProduct.push(p)
  }
*/
}
