import { ResolveFn } from '@angular/router';
import { IProject } from '../models';
import { inject } from '@angular/core';
import { ProjectApi } from '../services/project-api';

export const projectResolver: ResolveFn<IProject> = (route) => {
  const _projectApi = inject(ProjectApi);
  const projecId = route.paramMap.get('projectId')!;

  return _projectApi.getById(projecId);
};
