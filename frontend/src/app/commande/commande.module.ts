import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommandeRoutingModule } from './commande-routing.module';
import { PanierComponent } from './panier/panier.component';
import { OrdreComponent } from './ordre/ordre.component';
import { CommandeInfoComponent } from './commande-info/commande-info.component';


@NgModule({
  declarations: [
    PanierComponent,
    OrdreComponent,
    CommandeInfoComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
	FormsModule,
    HttpClientModule
	]
})
export class CommandeModule { }
