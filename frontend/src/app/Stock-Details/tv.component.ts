import { Component } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent {

  listProduct=[
    {
      id:1,
      title:"TV 1",
      price:200,
      quantity:2,
      like:0,
      image:"../../assets/images/tv.jpg"
    },
    {
      id:2,
      title:"TV 2",
      price:150,
      quantity:0,
      like:0,
      image:"../../assets/images/tv.jpg"

    },
    {
      id:3,
      title:"Tv 3",
      price:100,
      quantity:0,
      like:0,
      image:"../../assets/images/tv.jpg"
    },
    {
      id:4,
      title:"Tv 4",
      price:200,
      quantity:0,
      like:0,
      image:"../../assets/images/tv.jpg"
    }
    ,
    {
      id:5,
      title:"Tv 5",
      price:200,
      quantity:0,
      like:0,
      image:"../../assets/images/tv.jpg"
    }

  ]


}
