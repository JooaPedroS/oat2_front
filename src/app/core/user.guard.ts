import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = () => {
  const user = inject(UserService);
  const router = inject(Router);
  // chama o service, se username nao existir, ele manda pra /register
  return user.exists() ? true : router.createUrlTree(['/register']);
};

export const guestGuard: CanActivateFn = () => {
  const user = inject(UserService);
  const router = inject(Router);
  // chama o service, se username existir, manda pra /
  return user.exists() ? router.createUrlTree(['/']) : true;
};
