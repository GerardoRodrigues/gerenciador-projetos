import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('componente deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o titulo de Página não encontrada', () => {
    const html: HTMLElement = fixture.nativeElement;
    const tituloH1 = html.querySelector('[data-testid="titulo"]');

    expect(tituloH1).toBeTruthy();
    expect(tituloH1?.textContent.trim()).toBe('Página não encontrada');
  });

  it('deve ter um link de redirecionamento para a página inicial (/)', () => {
    const html: HTMLElement = fixture.nativeElement;
    const link = html.querySelector('[data-testid="link"]');

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/');
  });

  it('descricao deve ser exibida', () => {
    const html: HTMLElement = fixture.nativeElement;
    const descricao = html.querySelector('[data-testid="descricao"]');

    expect(descricao).toBeTruthy();
    expect(descricao?.textContent.trim()).toContain('não existe ou foi movida para outro endereço');
  });

  it('deve encontrar o link com debugElement', () => {
    const debugElement = fixture.debugElement;
    const linkDebug = debugElement.query(By.directive(RouterLink));

    expect(linkDebug).toBeTruthy();

    const htmlA: HTMLElement = linkDebug.nativeElement;
    expect(htmlA.getAttribute('href')).toBe('/');
  });
});
