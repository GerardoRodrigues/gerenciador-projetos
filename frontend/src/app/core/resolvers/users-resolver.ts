import { ResolveFn } from '@angular/router';
import { IUser } from '../models';
import { inject } from '@angular/core';
import { AdminApi } from '../services/admin-api';

export const usersResolver: ResolveFn<IUser[]> = () => {
  const _adminApi = inject(AdminApi);

  return _adminApi.getUsers();
};
