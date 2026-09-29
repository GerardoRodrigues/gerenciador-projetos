import { Component } from '@angular/core';
import { LoadingBar } from './loading-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

@Component({
  template: '',
})
class TestComponent {}

describe('LoadingBarComponent', () => {
  let component: LoadingBar;
  let fixture: ComponentFixture<LoadingBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBar],
      providers: [provideRouter([{ path: 'rota-sucesso', component: TestComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBar);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('componente deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o loading inicialmente', () => {
    const html: HTMLElement = fixture.nativeElement;
    const loadingBar = html.querySelector('[data-testid="loading-bar"]');

    expect(loadingBar).toBeTruthy();
  });

  it('deve esconder o loading quando signal for false', () => {
    component.isLoading.set(false);

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const loadingBar = html.querySelector('[data-testid="loading-bar"]');

    expect(loadingBar).toBeNull();
  });

  it('deve exibir e esconder o loading quando for mudado a rota com sucesso', async () => {
    vi.useFakeTimers();

    const _router = TestBed.inject(Router);

    component.isLoading.set(false);
    fixture.detectChanges();

    const navegacao = _router.navigate(['/rota-sucesso']);
    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    let loadingBar = html.querySelector('[data-testid="loading-bar"]');
    expect(loadingBar).toBeTruthy();

    await navegacao;

    vi.advanceTimersByTime(300);
    fixture.detectChanges();

    loadingBar = html.querySelector('[data-testid="loading-bar"]');
    expect(loadingBar).toBeNull();

    vi.useRealTimers();
  });

  it('deve exibir e esconder o loading quando for mudado a rota com erro', async () => {
    vi.useFakeTimers();

    const _router = TestBed.inject(Router);

    component.isLoading.set(false);
    fixture.detectChanges();

    const navegacao = _router.navigate(['/rota-erro']).catch(() => {});
    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    let loadingBar = html.querySelector('[data-testid="loading-bar"]');
    expect(loadingBar).toBeTruthy();

    await navegacao;

    vi.advanceTimersByTime(300);
    fixture.detectChanges();

    loadingBar = html.querySelector('[data-testid="loading-bar"]');
    expect(loadingBar).toBeNull();

    vi.useRealTimers();
  });
});
