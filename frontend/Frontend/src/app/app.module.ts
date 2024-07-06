import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Ajout de FormsModule ici
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { GarageComponent } from './garage/garage.component';
import { GarageDetailsComponent } from './garage/garage-details/garage-details.component';
import { GarageUpdateComponent } from './garage/garage-update/garage-update.component';
import { AddGarageComponent } from './garage/add-garage/add-garage.component';
import { StatisticsComponent } from './garage/statistics/statistics.component';
import { GarageCategoryComponent } from './garage-category/garage-category.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    GarageComponent,
    GarageDetailsComponent,
    GarageUpdateComponent,
    AddGarageComponent,
    StatisticsComponent,
    GarageCategoryComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, // FormsModule importé ici
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
