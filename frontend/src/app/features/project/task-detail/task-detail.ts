import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../../core/models';
import { TaskApi } from '../../../core/services/task-api';
import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes-guard';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss']
})
export class TaskDetail implements OnInit, HasUnsavedChanges {
  private readonly _taskApi = inject(TaskApi);

  task = signal<ITask>({
    id: 'TSK-1029',
    projectId: 'PRJ-101',
    title: 'Implementar autenticação JWT',
    description: 'Criar o fluxo de login com access token e refresh token no backend e frontend.',
    status: 'in_progress'
  });
  editedTask = signal<ITask | null>({
    id: 'TSK-1029',
    projectId: 'PRJ-101',
    title: 'Implementar autenticação JWT',
    description: 'Criar o fluxo de login com access token e refresh token no backend e frontend.',
    status: 'in_progress'
  });
  isDirty = signal(false);
  isSaving = signal(false);

  ngOnInit(): void {
  }

  hasUnsavedChanges(): boolean {
    return this.isDirty();
  }

  markDirty(): void {
    this.isDirty.set(true);
  }

  save(): void {
    const currentEdited = this.editedTask();
    if (!currentEdited) return;
    this.isSaving.set(true);
    this._taskApi.update(currentEdited.id, currentEdited).subscribe({
      next: (updated) => {
        this.task.set(updated);
        this.isDirty.set(false);
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      }
    });
  }

  close(): void {

  }
}
