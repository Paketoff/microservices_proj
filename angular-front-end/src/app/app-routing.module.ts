import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { OrderCreateComponent } from './admin/order-create/order-create.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductCreateComponent } from './admin/product-create/product-create.component';
import { ProductsComponent } from './admin/products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent,
  children: [
    {path: 'products', component: ProductsComponent},
    {path: 'products/create', component: ProductCreateComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'order-create', component: OrderCreateComponent}
  ]},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
