import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterLink , CurrencyPipe ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartDetails:Icart={} as Icart;
  private readonly CartService = inject(CartService);
  isLoading:boolean =false;

  ngOnInit(): void {
    this.getLoged(); 
      
  }

  getLoged():void
  {
   
    this.CartService.getLoggedUserCart().subscribe({
      next:(res)=>
      {
        console.log(res.data);
        this.cartDetails=res.data;
       
        
      },
      error:(ert)=>
      {
         console.log(ert);
         
      }
    })
  }


  deletecart(id:string):void
  {
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        this.CartService.removeProduct(id).subscribe({
          next:(res)=>
            {
              console.log(res);
              this.cartDetails=res.data;
              this.CartService.cartNumber.set(res.numOfCartItems)

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              
            },
            error:(ert)=>
            {
               console.log(ert);
               
            }
    
        })
       
        
      }
    });
  }

  updataCart(id:string , count:number):void
  {
    this.CartService.UpdataCart(id,count).subscribe(
      {
        next:(res)=>
          {
            console.log(res);
            this.cartDetails=res.data;
            
          },
          error:(ert)=>
          {
             console.log(ert);
             
          }

      }
    )
  }


  clearCart():void
  {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.CartService.clearCart().subscribe(
          {
            next:(res)=>
              {
                console.log(res);
              if (res.message === 'success') {
                this.cartDetails= {} as Icart
                this.CartService.cartNumber.set(0);

                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                
              }
                
              },
              error:(ert)=>
              {
                 console.log(ert);
                 
              }
    
          }
        )


       
      }
    });






    
    
    
  }

}
