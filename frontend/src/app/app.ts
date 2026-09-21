import { Component } from '@angular/core';
import { Login } from './features/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [Login],
  template: `
    <app-login />
  `,
  styles: []
})
export class App { }
