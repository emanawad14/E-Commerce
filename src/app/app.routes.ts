import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authsGuard } from './core/guards/auths/auths.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = 
[

    {path:'' ,redirectTo:'home' ,pathMatch:'full'},
    {path:''
         ,component:AuthLayoutComponent , canActivate:[logedGuard] ,children:
        [
            {path:'login' ,loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent) ,title:'login'},
            {path:'register' ,loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent) ,title:'register'},
            {path:'forgetPassword' ,loadComponent:()=>import('./pages/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent) ,title:'checkout'},
        ]
    },
    {path:'' 
        ,component:BlankLayoutComponent , canActivate:[authsGuard] , children:
        [
           
            {path:'home' ,loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) ,title:'home'},
            {path:'products' ,loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent),title:'products'},
            {path:'cart' ,loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) ,title:'cart'},
            {path:'wishList' ,loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent) ,title:'wishList'},
            {path:'categories' ,loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent) ,title:'categories'},
            {path:'brands' ,loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent),title:'brands'},
            {path:'checkout/:id' ,loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent) ,title:'checkout'},
            {path:'allorders' ,loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent) ,title:'allorders'},
            {path:'details/:id' ,loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent) ,title:'details'},
            {path:'brand-details/:id' ,loadComponent:()=>import('./pages/brand-details/brand-details.component').then((c)=>c.BrandDetailsComponent) ,title:'brands-details'},
            {path:'Categories-details/:id' ,loadComponent:()=>import('./pages/categories-details/categories-details.component').then((c)=>c.CategoriesDetailsComponent) ,title:'Categories-details'},
          
            
            
            {path:'**' ,component:NotfoundComponent ,title:'notfound'},
        ]
    }




];
