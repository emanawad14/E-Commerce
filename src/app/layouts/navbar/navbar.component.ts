import { Component, computed, inject, input,OnInit,  Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly hamada=inject(AuthService);
  private readonly CartService=inject(CartService);

  //  countCart!:number;

  ngOnInit(): void {
  // this.CartService.cartNumber.subscribe({
  //   next:(value)=>
  //   {
  //     this.countCart=value
  //   }
  // })


  this.CartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.CartService.cartNumber.set(res.numOfCartItems)
    }
  })
  }
 

  countCart:Signal<number>=computed(()=>this.CartService.cartNumber());



  
  isLogin= input<boolean>(true)

  removeSign():void
  {
    this.hamada.removeTokenData()
  }


}
