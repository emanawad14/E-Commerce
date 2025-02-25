import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { iproduct,  } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import   AOS from 'aos';

@Component({
  selector: 'app-home',
  imports: [CarouselModule , RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {


  
color:string='red'




  @ViewChild ('eman') myElement!:ElementRef
  showElement():void
  {
    this.myElement.nativeElement.classList.add('bg-red-700')
  }






  categoriesdestory:Subscription=new  Subscription();
  Productsdestory:Subscription=new  Subscription();

  private readonly productServices=inject(ProductsService);
  private readonly categoriesServices= inject(CategoriesService);
  private readonly CartService= inject(CartService);


  private readonly ToastrService= inject(ToastrService);
  private readonly wishlistService= inject(WishlistService);
  products:iproduct[]=[];


    categories:Icategories[]=[];


//*************    On init  ******************************** */

    ngOnInit(): void {
      this.getProducts();
     this.getCategories();
     AOS.init();
    
   }

//****************    Add Product  ********************************** */
    addProductTocart(id:string):void
    {
      this.CartService.addProducttoCart(id).subscribe(
        {
          next:(eww)=>
          {
            console.log(eww);
            this.ToastrService.success( eww.message , 'FreshCart');
            this.CartService.cartNumber.set(eww.numOfCartItems) 
            

          },
          error:(euw)=>
          {
            console.log(euw);
          }
        }
      )
    }
    //************    Add Wish List  ************************************** */
    addwishList(id:string):void
    {
      this.wishlistService.AddCarttoWishList(id).subscribe(
        {
          next:(eww)=>
            {
              console.log(eww.data);
               this.ToastrService.success( eww.message , 'FreshCart');
               if(eww.status === 'success')
               {
                this.color
               }
              // this.CartService.cartNumber.set(eww.numOfCartItems) ;
              //this.wishlistService.count.set(eww)
              
  
            },
            error:(euw)=>
            {
              console.log(euw);
            }

        }
      )
    }
    
//********************  Get category  ****************************** */
   getCategories():void
   {
  this.categoriesdestory=this.categoriesServices.getAllCategories().subscribe(
      {
        next:(err)=>
        {
          // console.log(err.data);
          
         this.categories= err.data;
          
        },
        error:(rro)=>
        {
          console.log(rro);
          
        }
      }
    )
   }


//*******************     Get Product  ********************************* */
  getProducts():void
  {
   this.Productsdestory= this.productServices.getAllProducts().subscribe(
      {
        next:(res)=>
        {
          this.products=res.data;
          //  console.log(res.data);
           
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      })
  }

//******************   OWL  *************************8 */

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
   autoplay:true,
   autoplayTimeout:3000,
   autoplayHoverPause:true,
    dots: false,
    
    navSpeed: 700,
  
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
   
  }

//************************************************** */

  customOptionstype: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
    
   
    
    items:1,
   
  }

//**************   On Destory *************************** */
  ngOnDestroy(): void {
    this.categoriesdestory.unsubscribe();
    this.Productsdestory.unsubscribe();
      
  }

}
