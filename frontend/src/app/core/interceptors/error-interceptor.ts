import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthManager } from '../services/auth-manager';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authManager = inject(AuthManager);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        authManager.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
