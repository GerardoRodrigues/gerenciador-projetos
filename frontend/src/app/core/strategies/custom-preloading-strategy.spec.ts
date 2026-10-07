import { TestBed } from '@angular/core/testing';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { Route } from '@angular/router';
import { EMPTY, of } from 'rxjs';

describe('Custom Preloading Strategy', () => {
  let strategy: CustomPreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomPreloadingStrategy],
    });

    strategy = TestBed.inject(CustomPreloadingStrategy);
  });

  it('deve executar a funcao load caso a rota tenha o preload', () => {
    const routeMock: Route = {
      data: {
        preload: true,
      },
    };

    const loadFnSpy = vi.fn().mockReturnValue(of('Módulo carregado'));

    strategy.preload(routeMock, loadFnSpy);

    expect(loadFnSpy).toHaveBeenCalled();
  });

  it('nao deve executar a funcao load caso a rota nao tenha o preload', () => {
    const routeMock: Route = {
      data: {},
    };

    const loadFnSpy = vi.fn();

    const result = strategy.preload(routeMock, loadFnSpy);

    expect(loadFnSpy).not.toHaveBeenCalled();
    expect(result).toBe(EMPTY);
  });
});
