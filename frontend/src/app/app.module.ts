import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { AdminWelcomeComponent } from './login/admin-form/admin-form.component';
import { ResetpassFormComponent } from './login/resetpass-form/resetpass-form.component';
import { UserListComponent } from './login/userlist-form/userlist-form.component';
import { RequestResetPasswordComponent } from './login/requestresetpassword-form/requestresetpassword-form.component';
import { UserUpdateComponent } from './login/user-update/user-update.component';
import { BannedUsersComponent } from './login/banned-users/banned-users.component';
import { UserStatisticsComponent } from './login/user-statistics/user-statistics.component';
import { UserProfilePhotoComponent } from './login/user-profile-photo/user-profile-photo.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserProfileComponent  } from './login/user-profile/user-profile.component';






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
    LoginFormComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ResetpassFormComponent,
    UserListComponent,
    RequestResetPasswordComponent,
    UserUpdateComponent,
    BannedUsersComponent,
    UserStatisticsComponent,
    AdminWelcomeComponent,
    UserProfilePhotoComponent,
    UserProfilePhotoComponent,
    UserProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA  
  ],
})
export class AppModule {}
