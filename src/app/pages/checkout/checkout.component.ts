import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit , OnDestroy {

  private readonly x =inject(ActivatedRoute);

 private readonly OrdersService =inject(OrdersService);

 grtCardDestory:Subscription=new Subscription
  getIdCart:string="";

  isLoasing:boolean=false;

  checkOutForm !:FormGroup;

  ngOnInit(): void {
    this.ControlForm();
    this.getCartId();
    
  }

  getCartId():void
  {
    this.x.paramMap.subscribe(
      {
        next:(parma)=>
        {
        this.getIdCart=parma.get('id')!;
        }
      }
    )
  }


  
  

  ControlForm():void
  {
    this.checkOutForm=new FormGroup(
      {
        details:new FormControl(null , [Validators.required]),
        phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
        city:new FormControl(null , [Validators.required ])
      }
    )
  }

  checkOut():void{
    this.isLoasing=true;
    this.checkOutForm.value;
    console.log(  this.checkOutForm.value);
    this.OrdersService.checkOutPayment(this.getIdCart ,this.checkOutForm.value).subscribe({

      next:(res)=>
      {
        console.log(res);
        if(res.status === 'success')
                    {
                      open(res.session.url , '_self')
                    }
        
      },
      error:(err)=>
      {
        console.log(err);
        

      }

    })
    
    
    
  }

  ngOnDestroy(): void {
      this.grtCardDestory
  }

}
