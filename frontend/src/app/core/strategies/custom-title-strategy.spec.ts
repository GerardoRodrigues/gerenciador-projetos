import { TestBed } from '@angular/core/testing';
import { CustomTitleStrategy } from './custom-title-strategy';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
describe('Custom Title Strategy', () => {
  let titleStrategy: CustomTitleStrategy;
  let titleServiceMock: any;

  beforeEach(() => {
    titleServiceMock = {
      setTitle: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [CustomTitleStrategy, { provide: Title, useValue: titleServiceMock }],
    });

    titleStrategy = TestBed.inject(CustomTitleStrategy);
  });

  it('deve concatenar o title com o appName', () => {
    vi.spyOn(titleStrategy, 'buildTitle').mockReturnValue('Dashboard');

    titleStrategy.updateTitle({} as RouterStateSnapshot);

    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Dashboard | Gestão de Projetos');
  });

  it('deve definir apenas o appName quando não houver title', () => {
    vi.spyOn(titleStrategy, 'buildTitle').mockReturnValue(undefined);

    titleStrategy.updateTitle({} as RouterStateSnapshot);

    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Gestão de Projetos');
  });
});
