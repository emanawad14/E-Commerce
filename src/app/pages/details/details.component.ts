import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { iproduct } from '../../shared/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy {
  private readonly ActivatedRoute=inject(ActivatedRoute);
  private readonly ProductsService=inject(ProductsService);

  private readonly ToastrService= inject(ToastrService);
  private readonly CartService= inject(CartService);


  ActiveDestory:Subscription=new Subscription
   products:iproduct ={} as iproduct;


   

  ngOnInit(): void {
      this. activateBrand();
  }

  //*************   Add pRoduct  ******************** */

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


 
    //**************   Brand  ******************************* */

  activateBrand():void
  {
    this.ActivatedRoute.paramMap.subscribe
    ({
      next:(p)=>{
        let ibProducrt= p.get('id');

        this.ProductsService.getAllSepecificsProducts(ibProducrt).subscribe(
          {
            next:(res)=>
            {
              console.log(res.data);
              this.products=res.data;

            },
            error:(rrs)=>
              {
                console.log(rrs);
                
  
              }
          }
        )
      }
    })
  }

//***************    owl  ****************** */
  customOptions: OwlOptions = {
    
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
   
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navSpeed: 700,
   
    // navText: ['', ''],
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
    // nav: false
  }







//************   Ondestory  ********************* */
  ngOnDestroy(): void {
      this.ActiveDestory
  }
}
