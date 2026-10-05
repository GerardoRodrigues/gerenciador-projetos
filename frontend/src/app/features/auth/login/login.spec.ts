import { of, throwError } from 'rxjs';
import { Login } from './login';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthManager } from '../../../core/services/auth-manager';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const mockAuthManager = {
    login: vi.fn().mockReturnValue(of({ token: '123', user: { nome: 'Teste' } })),
    logout: vi.fn(),
    isAuthenticated: vi.fn().mockReturnValue(false),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthManager, useValue: mockAuthManager },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve navegar para /dashboard após login bem-sucedido', () => {
    const email = 'teste@email.com';

    component.email = email;
    component.login();

    expect(mockAuthManager.login).toHaveBeenCalledWith(email);
    expect(mockAuthManager.login).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('deve retornar erro ao falhar o login', () => {
    mockAuthManager.login.mockReturnValueOnce(
      throwError(() => {
        new Error('Não autorizado');
      }),
    );

    const email = 'teste@email.com';

    component.email = email;
    component.login();

    expect(mockAuthManager.login).toHaveBeenCalledWith(email);
    expect(mockAuthManager.login).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigate).not.toHaveBeenCalled();

    expect(component.error).toBe('Email inválido. Tente felipe@example.com ou ana@example.com');
    expect(component.isLoading).toBe(false);
  });

  it('deve atualizar o email via ngModel quando o usuario digitar no input', async () => {
    const html: HTMLElement = fixture.nativeElement;
    const input = html.querySelector('[data-testid="email-input"]') as HTMLInputElement;

    const email = 'teste@email.com';

    input.value = email;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.email).toBe(email);
  });

  it('deve chamar o método login() ao submeter o formulário', async () => {
    const html: HTMLElement = fixture.nativeElement;
    const input = html.querySelector('[data-testid="email-input"]') as HTMLInputElement;
    const email = 'teste@email.com';
    input.value = email;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formDebug = fixture.debugElement.query(By.css('[data-testid="login-form"]'));

    formDebug.triggerEventHandler('submit', null);

    expect(mockAuthManager.login).toHaveBeenCalledWith(email);
    expect(mockAuthManager.login).toHaveBeenCalledTimes(1);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('deve renderizar mensagem de erro quando a propriedade error for preenchida', () => {
    const errorMessage = 'Credenciais inválidas';

    component.error = errorMessage;
    fixture.detectChanges();

    const errorEl: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="error-message"]',
    );

    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain(errorMessage);
  });

  it('deve desativar o botão de login enquanto estiver carregando', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="submit-button"]',
    );

    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Autenticando');
  });
});
