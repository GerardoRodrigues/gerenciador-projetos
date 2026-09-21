import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthManager } from '../../../core/services/auth-manager';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  error = '';
  isLoading = false;

  private readonly _authManager = inject(AuthManager);

  login(): void {
    this.isLoading = true;
    this.error = '';
    this._authManager.login(this.email).subscribe({
      next: () => {

      },
      error: () => {
        this.error = 'Email inválido. Tente felipe@example.com ou ana@example.com';
        this.isLoading = false;
      }
    });
  }
}
