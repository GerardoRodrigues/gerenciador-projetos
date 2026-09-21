import { Component, signal } from '@angular/core';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';
import { IUser } from '../../../core/models';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe],
  templateUrl: './users.html'
})
export class Users {
  users = signal<IUser[]>([]);
}
