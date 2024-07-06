import { Component } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {
handleProductLike($event: any) {
throw new Error('Method not implemented.');
}
goBack() {
throw new Error('Method not implemented.');
}

listProduct=[
  {
    id: 1,
    Name: "Engine Oil",
    price: 20,
    quantity: 10,
    like: 0,
    image: "../../assets/images/tv.jpg"
  },
  {
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },
  {
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },
  {
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },
  {
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },
  {
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{
    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{

    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"
  },{

    Name: "Car Battery",
    reference: 100,
    quantity: 3,
    price: 0,
    category:"car",
    image: "../../assets/images/tv.jpg"


  }]



}
