import { Dashboard } from './dashboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectApi } from '../../core/services/project-api';
import { of } from 'rxjs';
import { IProject } from '../../core/models';

describe('Dashboard Component', () => {
  let fixture: ComponentFixture<Dashboard>;
  let component: Dashboard;

  let apiMock = {
    getAll: vi
      .fn()
      .mockReturnValue(
        of([
          { id: '1', name: 'Projeto 1', description: 'Descrição do Projeto 1' } as IProject,
          { id: '2', name: 'Projeto 2', description: 'Descrição do Projeto 2' } as IProject,
        ]),
      ),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{ provide: ProjectApi, useValue: apiMock }, provideRouter([])],
    });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve extrair os projetos da api e renderizar o template', () => {
    expect(apiMock.getAll).toHaveBeenCalledTimes(1);
    expect(component.projects().length).toBe(2);

    const htmlCompleto = fixture.nativeElement.innerHTML;
    expect(htmlCompleto).toContain('2');
  });

  it('deve renderizar a quantidade correta de cards no @for', () => {
    const projectsCard = fixture.nativeElement.querySelectorAll('[data-testid="project-card"]');
    expect(projectsCard.length).toBe(2);

    expect(fixture.nativeElement.innerHTML).toContain('Projeto 1');
    expect(fixture.nativeElement.innerHTML).toContain('Projeto 2');
  });
});
