import { HttpInterceptorFn } from '@angular/common/http';

export const customeInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const token = localStorage.getItem('LoginToken')
  const newCloneRequest=req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newCloneRequest);
};
