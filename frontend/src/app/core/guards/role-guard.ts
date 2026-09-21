import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const _authManager = inject(AuthManager);
    const _router = inject(Router);

    const user = _authManager.user();

    if (user?.role === requiredRole) return true;

    const urlTree = _router.createUrlTree(['/dashboard']);
    return new RedirectCommand(urlTree, { replaceUrl: true });
  };
};
