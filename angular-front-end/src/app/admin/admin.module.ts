import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin.component';
import { MenuModule } from './menu/menu.module';
import { NavModule } from './nav/nav.module';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './orders/orders.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialsCreateComponent } from './materials-create/materials-create.component';



@NgModule({
  declarations: [
    MenuComponent,
    NavComponent,
    AdminComponent,
    ProductsComponent,
    ProductCreateComponent,
    OrdersComponent,
    OrderCreateComponent,
    MaterialsComponent,
    MaterialsCreateComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    NavModule,
    RouterModule,
    FormsModule,
    OrdersModule,
    ReactiveFormsModule 
  ]
})
export class AdminModule { }
