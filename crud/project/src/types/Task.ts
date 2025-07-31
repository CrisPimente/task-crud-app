export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status?: Task['status'];
  priority?: Task['priority'];
  category?: string;
  search?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Task['priority'];
  category: string;
  dueDate: string;
}