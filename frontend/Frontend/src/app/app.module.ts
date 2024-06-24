import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GarageComponent } from './garage/garage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GarageDetailsComponent } from './garage/garage-details/garage-details.component';
import { GarageUpdateComponent } from './garage/garage-update/garage-update.component';
import { AddGarageComponent } from './garage/add-garage/add-garage.component';
import { StatisticsComponent } from './garage/statistics/statistics.component';

@NgModule({
  declarations: [AppComponent, GarageComponent, GarageDetailsComponent, GarageUpdateComponent, AddGarageComponent, StatisticsComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
