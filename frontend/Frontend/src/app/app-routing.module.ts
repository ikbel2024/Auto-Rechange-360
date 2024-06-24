import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageComponent } from './garage/garage.component';
import { GarageDetailsComponent } from './garage/garage-details/garage-details.component';
import { GarageUpdateComponent } from './garage/garage-update/garage-update.component';
import { AddGarageComponent } from './garage/add-garage/add-garage.component';
import { StatisticsComponent } from './garage/statistics/statistics.component';

const routes: Routes = [
  {
    path:'garage',
    component: GarageComponent,
  },
  {
    path:'add-garage',
    component: AddGarageComponent
  },
  {
    path:'details/:id',
    component: GarageDetailsComponent
  },
  {
    path:'update/:id',
    component: GarageUpdateComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
