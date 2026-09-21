export interface ITask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeId?: string;
}
