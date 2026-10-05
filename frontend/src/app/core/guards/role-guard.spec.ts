import { roleGuard } from './role-guard';
import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

describe('RoleGuard', () => {
  const authManegerMock = {
    user: vi.fn(),
  };

  const routerMock = {
    createUrlTree: vi.fn().mockReturnValue({} as UrlTree),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManegerMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('deve redirecionar para a tela caso seja autenticado', () => {
    authManegerMock.user.mockReturnValue({ role: 'admin' });

    const result = TestBed.runInInjectionContext(() => {
      return roleGuard('admin')(null as any, null as any);
    });

    expect(result).toBe(true);
  });

  it('deve redirecionar para a tela de dashboard caso não seja autenticado', () => {
    authManegerMock.user.mockReturnValue({ role: 'user' });

    const result = TestBed.runInInjectionContext(() => {
      return roleGuard('admin')(null as any, null as any);
    });

    expect(authManegerMock.user).toHaveBeenCalled();
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/dashboard']);
    expect(result).toBeInstanceOf(RedirectCommand);
  });
});
