import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProdComponent } from './Product/detail-prod/detail-prod.component';

import { AddProductComponent } from './Product/add-product/add-product.component';

import { TvComponent } from './categorie/Stock-Details/tv.component';

import { ShowOneProductComponent } from './show-one-product/show-one-product.component';
import { HttpClientModule } from '@angular/common/http';

import { AdministrationComponent } from './administration/administration.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { ShowProductsComponent } from './Product/show-products/show-products.component';
import { SearchProductsComponent } from './Product/search-products/search-products.component';
import { CountProductComponent } from './Product/count-product/count-product.component';
import { FooterComponent } from './footer/footer.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { DeleteCategorieComponent } from './categorie/delete-categorie/delete-categorie.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { ShowCategorieComponent } from './categorie/show-categorie/show-categorie.component';
import { SearchCategorieComponent } from './categorie/search-categorie/search-categorie.component';
import { CountCategorieComponent } from './categorie/count-categorie/count-categorie.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { VinDecodeComponent } from './vin-decode/vin-decode.component';
import { VinDecodeService } from './vin-decode.service';
import { DetailComponent } from './Product/detail/detail.component';


import { VehiculeComponent } from './vehicule/vehicule.component';
import { MaintenanceVehiculeComponent } from './maintenance-vehicule/maintenance-vehicule.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AddVehiculeComponent } from './add-vehicule/add-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { DeleteVehiculeComponent } from './delete-vehicule/delete-vehicule.component';
import { DisplayVehiculesComponent } from './display-vehicules/display-vehicules.component';






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
    FooterComponent,
    AddCategorieComponent,
    DeleteCategorieComponent,
    UpdateCategorieComponent,
    ShowCategorieComponent,
    SearchCategorieComponent,
    CountCategorieComponent,
    ChatBotComponent,
    VinDecodeComponent,
    DetailComponent,

     VehiculeComponent,
    MaintenanceVehiculeComponent,
    HistoriqueComponent,
    AddVehiculeComponent,
    UpdateVehiculeComponent,
    DeleteVehiculeComponent,
    DisplayVehiculesComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [VinDecodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
