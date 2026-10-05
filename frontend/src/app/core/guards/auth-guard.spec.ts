import { authGuard } from './auth-guard';
import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

describe('AuthGuard', () => {
  const authManagerMock = {
    isAuthenticated: vi.fn(),
  };

  const routerMock = {
    createUrlTree: vi.fn().mockReturnValue({} as UrlTree),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('deve redirecionar para a tela caso seja autenticado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(null as any, null as any);
    });

    expect(result).toBe(true);
  });

  it('deve redirecionar para a tela de login caso não seja autenticado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(null as any, null as any);
    });

    expect(authManagerMock.isAuthenticated).toHaveBeenCalled();
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBeInstanceOf(RedirectCommand);
  });
});
