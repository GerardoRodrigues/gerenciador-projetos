import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectApi } from '../../core/services/project-api';
import { InitialsPipe } from '../../shared/pipes/initials-pipe';

@Component({
  selector: 'app-members',
  imports: [InitialsPipe],
  templateUrl: './members.html'
})
export class Members {
  private readonly _projectApi = inject(ProjectApi);
  members = toSignal(this._projectApi.getMembers(), { initialValue: [] });
}
