import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import {MyorderComponent} from './myorder/myorder.component';
import {AdminComponent} from './admin/admin.component';
import{ AddProductComponent} from './add-product/add-product.component';
import {SearchComponent} from './search/search.component';
import {EditProductComponent} from './edit-product/edit-product.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'Myorder', component: MyorderComponent},
  { path: 'Admin', component:AdminComponent},
  {path:'AddProduct',component:AddProductComponent},
  {path: 'Search',component:SearchComponent},
  {path: 'Edit',component:EditProductComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
