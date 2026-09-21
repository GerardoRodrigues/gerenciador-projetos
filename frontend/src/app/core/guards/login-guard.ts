import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

export const loginGuard: CanActivateFn = () => {
  const _authManager = inject(AuthManager);
  const _router = inject(Router);

  if (!_authManager.isAuthenticated()) {
    return true;
  }

  const urlTree = _router.createUrlTree(['/dashboard']);
  return new RedirectCommand(urlTree, { replaceUrl: true });
};
