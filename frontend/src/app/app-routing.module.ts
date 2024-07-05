import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProdComponent } from './Product/detail-prod/detail-prod.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { TvComponent } from './categorie/Stock-Details/tv.component';
import { ShowProductsComponent } from './Product/show-products/show-products.component';
import { AdministrationComponent } from './administration/administration.component';
import { DeleteProductComponent } from './Product/delete-product/delete-product.component';
import { UpdateProductComponent } from './Product/update-product/update-product.component';
import { SearchProductsComponent } from './Product/search-products/search-products.component';
import { CountProductComponent } from './Product/count-product/count-product.component';
import { SearchCategorieComponent } from './categorie/search-categorie/search-categorie.component';
import { ShowCategorieComponent } from './categorie/show-categorie/show-categorie.component';
import { UpdateCategorieComponent } from './categorie/update-categorie/update-categorie.component';
import { DeleteCategorieComponent } from './categorie/delete-categorie/delete-categorie.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { CountCategorieComponent } from './categorie/count-categorie/count-categorie.component';
import { VehiculeComponent } from './vehicule/vehicule.component';  
import { MaintenanceVehiculeComponent } from './maintenance-vehicule/maintenance-vehicule.component';
import { DeleteVehiculeComponent } from './delete-vehicule/delete-vehicule.component';
import { DisplayVehiculesComponent } from './display-vehicules/display-vehicules.component';
import { AddVehiculeComponent } from './add-vehicule/add-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { HistoriqueComponent } from './historique/historique.component';


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
  { path: 'ShowCategorie', component: ShowCategorieComponent },
  { path: 'UpdateCategorie/:id', component: UpdateCategorieComponent },
  { path: 'DeleteCategorie', component: DeleteCategorieComponent },
  { path: 'AddCategorie', component: AddCategorieComponent },
  { path: 'SearchCategorie', component: SearchCategorieComponent },
  { path: 'CountCategorie', component: CountCategorieComponent },
  { path: 'product', component: DetailProdComponent },

  { path: 'vehicles', component: VehiculeComponent },
  { path: 'maintenance-vehicule', component: MaintenanceVehiculeComponent },
  { path: 'delete-vehicules/:id', component: DeleteVehiculeComponent },
  { path: 'display-vehicules', component: DisplayVehiculesComponent },
  { path: 'add-vehicule', component: AddVehiculeComponent },
  { path: 'update-vehicule/:id', component: UpdateVehiculeComponent },

  { path: 'historique-entretiens', component: HistoriqueComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
