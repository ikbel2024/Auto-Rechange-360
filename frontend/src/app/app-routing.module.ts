import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProdComponent } from './Product/detail-prod/detail-prod.component';

import { AddProductComponent } from './Product/add-product/add-product.component';

import { TvComponent } from './Stock-Details/tv.component';
import { ShowProductsComponent } from './Product/show-products/show-products.component';
import { AdministrationComponent } from './administration/administration.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { SearchProductsComponent } from './Product/search-products/search-products.component';
import { CountProductComponent } from './Product/count-product/count-product.component';


const routes: Routes = [
  { path: '', redirectTo: '/tv', pathMatch: 'full' },
  { path: 'tv', component: TvComponent },


  { path: 'addProduct', component: AddProductComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'ShowProucts', component: ShowProductsComponent },
  { path: 'SearchProducts', component: SearchProductsComponent },
  { path: 'CountProduct', component: CountProductComponent },
 
  { path: 'product', component: DetailProdComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
