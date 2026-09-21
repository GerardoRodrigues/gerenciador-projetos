import { Component } from '@angular/core';
import { Dashboard } from '../../../features/dashboard/dashboard';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [Dashboard, Sidebar],
  templateUrl: './main-layout.html'
})
export class MainLayout {
}
