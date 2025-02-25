import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



export const authsGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  const hamada=inject(PLATFORM_ID);
  const toastrService=inject(ToastrService);

  if(isPlatformBrowser(hamada))
  {
    if(localStorage.getItem('usertoken')!== null)
    {
      return true
    }
    else
    {
      toastrService.warning('Please complete the information and enter it correctly so that you can enter')
    router.navigate(['/login']);

      return false;
    }
  }
  else
  {
    return false;
  }
};
