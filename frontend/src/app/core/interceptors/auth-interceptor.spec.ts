import { authInterceptor } from './auth-interceptor';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthManager } from '../services/auth-manager';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const authManagerMock = {
    getToken: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve anexar o token de autorização ao cabeçalho da solicitação quando o token estiver presente', () => {
    authManagerMock.getToken.mockReturnValue('mocked-token');

    httpClient.get('/api/test').subscribe();

    const req = httpTestingController.expectOne('/api/test');

    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');

    req.flush({});
  });

  it('não deve anexar o cabeçalho de autorização quando o token não estiver presente', () => {
    authManagerMock.getToken.mockReturnValue(null);

    httpClient.get('/api/test').subscribe();

    const req = httpTestingController.expectOne('/api/test');

    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });
});
