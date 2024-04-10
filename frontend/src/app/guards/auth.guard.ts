import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SigninService } from '../services/signin.service';

export const authGuard: CanActivateFn = (route, state) => {
  const signinService = inject(SigninService);
  const router = inject(Router);

  if (signinService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};