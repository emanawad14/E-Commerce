import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('usertoken'))
  {
    req=req.clone({
      setHeaders:{
        token:localStorage.getItem('usertoken')!
      }
    })
  }
  return next(req);
};
