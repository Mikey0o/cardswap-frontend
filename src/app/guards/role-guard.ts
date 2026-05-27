import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    const userRole = localStorage.getItem('userRole');

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/inicio']);
    return false;
  };
}