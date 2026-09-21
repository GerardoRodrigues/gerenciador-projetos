import { Component, inject } from '@angular/core';
import { AuthManager } from '../../../core/services/auth-manager';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html'
})
export class Profile {
  readonly _authManager = inject(AuthManager);
}
