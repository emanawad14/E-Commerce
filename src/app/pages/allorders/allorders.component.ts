import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Iorders } from '../../shared/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly ordersService =inject(OrdersService);

  totalcartOrder !:number ;
  isDelivered !:boolean ;
  isPaied !:boolean ;
  PaymentMethodType !:number ;
  

  Iorders:Iorders[]=[];

  ngOnInit(): void {
    this.cartId=this.ordersService.getuserID();
    this.getUserOrder();
  }

  cartId:string ='';
  id:string='';
  getUserOrder():void
  {
    this.ordersService.getProductshopping(this.cartId).subscribe(
      {
        next:(res)=>
        {
          this.Iorders=res;
          console.log(res);
          
        },
        error:(ree)=>
        {
          console.log(ree);
          
        }
      }
    )
    
    
    
  }

}
