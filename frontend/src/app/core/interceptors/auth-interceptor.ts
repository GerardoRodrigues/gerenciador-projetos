import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthManager } from '../services/auth-manager';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authManager = inject(AuthManager);
  const token = authManager.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
