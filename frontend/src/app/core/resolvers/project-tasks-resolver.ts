import { ResolveFn } from '@angular/router';
import { ITask } from '../models';
import { inject } from '@angular/core';
import { ProjectApi } from '../services/project-api';

export const projectTasksResolver: ResolveFn<ITask[]> = (route) => {
  const _projectApi = inject(ProjectApi);
  const projecId = route.paramMap.get('projectId')!;

  return _projectApi.getTasks(projecId);
};
