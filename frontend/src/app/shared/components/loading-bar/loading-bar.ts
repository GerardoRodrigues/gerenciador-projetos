import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.html',
  styleUrls: ['./loading-bar.scss']
})
export class LoadingBar implements OnDestroy {
  isLoading = signal(false);

  ngOnDestroy(): void {

  }
}
