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
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { UserListComponent } from './login/userlist-form/userlist-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'admin/userlist', component: UserListComponent, canActivate: [AdminAuthGuardService] },




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
  { path: 'CountCategorie', component: CountCategorieComponent }
  ,
  { path: 'product', component: DetailProdComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
