import { loginGuard } from './login-guard';
import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

describe('Login Guard', () => {
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

  it('deve redirecionar para a tela de login caso não seja autenticado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() => {
      return loginGuard(null as any, null as any);
    });

    expect(result).toBe(true);
  });

  it('deve redirecionar para a tela de dashboard caso seja autenticado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => {
      return loginGuard(null as any, null as any);
    });

    expect(authManagerMock.isAuthenticated).toHaveBeenCalled();
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/dashboard']);

    expect(result).toBeInstanceOf(RedirectCommand);
  });
});
