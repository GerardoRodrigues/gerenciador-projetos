import { ResolveFn } from '@angular/router';
import { IAuditLog } from '../models';
import { inject } from '@angular/core';
import { AdminApi } from '../services/admin-api';

export const auditLogResolver: ResolveFn<IAuditLog[]> = () => {
  const _adminApi = inject(AdminApi);

  return _adminApi.getAuditLog();
};
