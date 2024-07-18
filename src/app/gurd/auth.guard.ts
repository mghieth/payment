import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const localDate = localStorage.getItem("LoginToken");
  if(localDate != null && localDate !=""){

    return true;
  } else {
    router.navigateByUrl("login")
    return false;
  }

};
