import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit , OnDestroy {
  
  private readonly wishList=inject(WishlistService);

  getLogedDestory:Subscription=new Subscription()

  wishlists:Iwishlist[]=[]

  //******************    on Init  *********************** */

  ngOnInit(): void {
      this.getLogedWishlist()
  }
  //*******************   get Loged  *********************************** */
  getLogedWishlist():void
  {
       this.wishList.getLoggedUserWishList().subscribe(
        {
          next:(res)=>
          {
            console.log(res);
            this.wishlists=res.data
            
          },
          error:(err)=>
          {
               console.log(err);
               
          }
        }
       )
  }
 //******************    Remove Wishlist ************************************ */

 removeWishlist(id:string):void{



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
      this.wishList.RemovewishList(id).subscribe(
        {
          next:(res)=>
            {
             
              this.wishlists=res.data;
              console.log(res);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            
              
            },
            error:(err)=>
            {
                 console.log(err);
                 
            }
    
        }
      )
  
  
     
      
    }
  });
  
  
 }
//***************      ondestory  ********************************* */
 ngOnDestroy(): void {
     this.getLogedDestory
 }
}
