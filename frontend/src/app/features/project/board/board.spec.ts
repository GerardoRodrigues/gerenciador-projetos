import { Board } from './board';
import { TestBed } from '@angular/core/testing';
import { IProject, ITask } from '../../../core/models';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Board Component', () => {
  const mockProject: IProject = {
    id: 'p1',
    name: 'Project 1',
    description: '...',
  };

  const mockTasks: ITask[] = [
    { id: 't1', title: 'Task 1', description: '...', status: 'todo', projectId: 'p1' },
    { id: 't2', title: 'Task 2', description: '...', status: 'in_progress', projectId: 'p1' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'project/board',
            component: Board,
            data: { project: mockProject, tasks: mockTasks },
          },
        ]),
      ],
    });
  });

  it('deve filtrar as tarefes corretamente usando computed signals e renderizar corretamente', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/project/board', Board);
    const html = harness.routeNativeElement!;

    expect(component.todoTasks().length).toBe(1);
    expect(component.inProgressTasks().length).toBe(1);
    expect(component.doneTasks().length).toBe(0);

    const todoColumn = html.querySelector('[data-testid="todo-column"]');
    const inProgressColumn = html.querySelector('[data-testid="in-progress-column"]');

    const cardsNoTodo = todoColumn?.querySelectorAll('[data-testid="task-card"]');
    const cardsNoInProgress = inProgressColumn?.querySelectorAll('[data-testid="task-card"]');

    expect(cardsNoTodo?.length).toBe(1);
    expect(cardsNoInProgress?.length).toBe(1);

    expect(todoColumn?.innerHTML).toContain('Task 1');
    expect(inProgressColumn?.innerHTML).toContain('Task 2');
  });

  it('deve abrir o modal de detalhes ao clicar em uma card', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/project/board', Board);
    const html = harness.routeNativeElement!;

    const router = TestBed.inject(Router);
    const naviteSpy = vi.spyOn(router, 'navigate');

    const card = html.querySelector('[data-testid="task-card"]') as HTMLDivElement;
    card.click();

    expect(naviteSpy).toHaveBeenCalledWith(
      [{ outlets: { details: ['task', 't1'] } }],
      expect.anything(),
    );
  });
});
