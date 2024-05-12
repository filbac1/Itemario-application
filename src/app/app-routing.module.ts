import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component'; // Import your LoginComponent
import { SignupComponent } from './signup/signup.component'; // Import your SignupComponent
import { StartComponent } from './start/start.component';
import { ProductComponent } from './product/product.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MultianalysisComponent } from './multianalysis/multianalysis.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent }, // Define a route for the LoginComponent
  { path: 'signup', component: SignupComponent },
  { path: 'start', component: StartComponent },
  { path: 'product', component: ProductComponent},
  { path: 'analysis', component: AnalysisComponent},
  { path: 'multianalysis', component: MultianalysisComponent},
  { path: 'shopping', component: ShoppingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
