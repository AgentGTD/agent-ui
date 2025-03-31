export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskParams {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface UpdateTaskParams {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
} 