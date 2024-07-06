import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageComponent } from './garage/garage.component';
import { GarageDetailsComponent } from './garage/garage-details/garage-details.component';
import { GarageUpdateComponent } from './garage/garage-update/garage-update.component';
import { AddGarageComponent } from './garage/add-garage/add-garage.component';
import { StatisticsComponent } from './garage/statistics/statistics.component';
import { GarageCategoryComponent } from './garage-category/garage-category.component';


const routes: Routes = [
  { path: 'garage', component: GarageComponent },
  
  { path: 'add-garage', component: AddGarageComponent },
  { path: 'details/:id', component: GarageDetailsComponent },
  { path: 'update/:id', component: GarageUpdateComponent },
  { path: 'delete/:id', component: GarageComponent },
  
  { path: 'statistics', component: StatisticsComponent },
  { path: 'garagecategory', component: GarageCategoryComponent },
  
  { path: '', redirectTo: '/garage', pathMatch: 'full' } // Redirect to garage as default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
