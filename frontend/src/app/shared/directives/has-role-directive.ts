import { Directive, inject, input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthManager } from '../../core/services/auth-manager';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private readonly _templateRef = inject(TemplateRef<any>);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _authManager = inject(AuthManager);
  private hasView = false;

  hasRole = input.required<string>();

  constructor() {
    effect(() => {
      const requiredRole = this.hasRole();
      const user = this._authManager.user();
      const shouldShow = user?.role === requiredRole;

      if (shouldShow && !this.hasView) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
        this.hasView = true;
      } else if (!shouldShow && this.hasView) {
        this._viewContainerRef.clear();
        this.hasView = false;
      }
    });
  }
}
