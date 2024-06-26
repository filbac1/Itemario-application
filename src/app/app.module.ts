import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StartComponent } from './start/start.component';
import { AuthService } from './auth.service';
import { ProductComponent } from './product/product.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MultianalysisComponent } from './multianalysis/multianalysis.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { PriceMovementChartComponent } from './price-movement-chart/price-movement-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    StartComponent,
    ProductComponent,
    AnalysisComponent,
    MultianalysisComponent,
    ShoppingComponent,
    PriceMovementChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
