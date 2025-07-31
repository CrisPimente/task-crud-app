import React from 'react';
import { Task } from '../types/Task';
import { TaskCard } from './TaskCard';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Inbox className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No hay tareas</h3>
        <p className="text-center max-w-sm">
          No se encontraron tareas que coincidan con los filtros actuales.
          ¡Crea una nueva tarea para comenzar!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};