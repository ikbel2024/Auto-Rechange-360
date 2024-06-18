import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  constructor() { }


  stat(list:any, criteria:string,value:any){
    let n =0;
    for(let i=0;i<list.length;i++){
      if(list[i][criteria]==value){
        n++;
      }
    }
    return n;
  }
}
