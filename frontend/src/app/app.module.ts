import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProdComponent } from './Product/detail-prod/detail-prod.component';

import { AddProductComponent } from './Product/add-product/add-product.component';

import { TvComponent } from './Stock-Details/tv.component';

import { ShowOneProductComponent } from './show-one-product/show-one-product.component';
import { HttpClientModule } from '@angular/common/http';

import { AdministrationComponent } from './administration/administration.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { ShowProductsComponent } from './Product/show-products/show-products.component';
import { SearchProductsComponent } from './Product/search-products/search-products.component';
import { CountProductComponent } from './Product/count-product/count-product.component';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    NotFoundComponent,
    DetailProdComponent,
    AddProductComponent,
    TvComponent,

    ShowOneProductComponent,

    AdministrationComponent,
    DeleteProductComponent,
    UpdateProductComponent,
    ShowProductsComponent,
    SearchProductsComponent,
    CountProductComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
