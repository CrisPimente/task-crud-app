import React from 'react';
import { Task } from '../types/Task';
import { 
  Clock, 
  Tag, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Circle, 
  PlayCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(task.status)} ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextStatus = task.status === 'pending' 
                  ? 'in-progress' 
                  : task.status === 'in-progress' 
                    ? 'completed' 
                    : 'pending';
                onStatusChange(task.id, nextStatus);
              }}
              className="hover:scale-110 transition-transform"
            >
              {getStatusIcon(task.status)}
            </button>
            <h3 className={`font-semibold text-gray-900 ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Editar tarea"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar tarea"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className={`text-gray-600 text-sm mb-3 ${task.status === 'completed' ? 'line-through' : ''}`}>
          {task.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
              {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
            </span>
            
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <Tag className="w-3 h-3" />
              {task.category}
            </span>
          </div>

          <div className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
            {isOverdue && <AlertTriangle className="w-3 h-3" />}
            <Calendar className="w-3 h-3" />
            {formatDate(task.dueDate)}
          </div>
        </div>

        {task.status === 'completed' && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Completada el {formatDate(task.updatedAt)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};