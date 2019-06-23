import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersComponentComponent} from "./customers-component/customers-component.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NewCustomerComponent} from './components/new-customer/new-customer.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { AuthGuard } from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {TopNavComponent} from './components/top-nav/top-nav.component';


const routes: Routes = [
  {path: '', redirectTo:'users', pathMatch:'full'},
  {path: 'users', component: CustomersComponentComponent, canActivate:[AuthGuard]},
  {path: 'user/new', component: NewCustomerComponent, canActivate:[AuthGuard]},
  {path: 'user/:id', component: CustomerDetailsComponent, canActivate:[AuthGuard]},
  {path: 'user/:id/edit', component: EditCustomerComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: TopNavComponent},
  {path: '**', component: PageNotFoundComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
