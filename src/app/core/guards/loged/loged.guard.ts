import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


export const logedGuard: CanActivateFn = (route, state) => {

  const router= inject(Router);
  const id = inject(PLATFORM_ID);
  const _provideToastr = inject(ToastrService);
  

  if(isPlatformBrowser(id))
  {
    if(localStorage.getItem('usertoken')!== null)
    {
      router.navigate(['/home']);
      _provideToastr.info('Please stay on the current page and do not exit it until you are finished ')

      return false;
    }
    else
    {
      return true
    }
  }
  else
  {
    return false;
  }
};
