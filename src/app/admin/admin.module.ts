import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OrderActionComponent } from './components/order/order-action/order-action.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { AdminProductAddComponent } from './components/products/admin-product-add/admin-product-add.component';
import { AdminProductDetailsComponent } from './components/products/admin-product-details/admin-product-details.component';
import { AdminProductListComponent } from './components/products/admin-product-list/admin-product-list.component';
import { AdminProductUpdateComponent } from './components/products/admin-product-update/admin-product-update.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoriesComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    OrderActionComponent,
    OrderListComponent,
    AdminProductAddComponent,
    AdminProductDetailsComponent,
    AdminProductListComponent,
    AdminProductUpdateComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
