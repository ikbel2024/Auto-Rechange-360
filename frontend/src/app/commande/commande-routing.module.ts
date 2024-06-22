import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { OrdreComponent } from './ordre/ordre.component';
import { CommandeInfoComponent } from './commande-info/commande-info.component';

const routes: Routes = [
 { path: 'panier', component: PanierComponent },
  { path: 'ordre', component: OrdreComponent },
  { path: 'commande-info', component: CommandeInfoComponent },
  { path: '', redirectTo: 'panier', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
