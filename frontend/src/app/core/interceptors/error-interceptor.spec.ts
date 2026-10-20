import { errorInterceptor } from './error-interceptor';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthManager } from '../services/auth-manager';
import { Router } from '@angular/router';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const authManagerMock = {
    logout: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        { provide: Router, useValue: routerMock },
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve chamar o logout e navegar para a tela de login caso o erro seja 401', () => {
    httpClient.get('/api/test').subscribe({
      error: () => {},
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Acesso negado', { status: 401, statusText: 'Unauthorized' });

    expect(authManagerMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('não deve chamar o logout nem navegar para a tela de login caso o erro não seja 401', () => {
    httpClient.get('/api/test').subscribe({
      error: () => {},
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Erro interno do servidor', { status: 500, statusText: 'Internal Server Error' });

    expect(authManagerMock.logout).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
