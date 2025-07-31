import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  AlertTriangle,
  BarChart3
} from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
    overdue: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: BarChart3,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
    {
      label: 'Completadas',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'En Progreso',
      value: stats.inProgress,
      icon: PlayCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Pendientes',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      label: 'Vencidas',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            
            {stat.label === 'Completadas' && stats.total > 0 && (
              <div className="mt-2 pt-2 border-t border-green-200">
                <div className="flex items-center justify-between text-xs text-green-600">
                  <span>Progreso</span>
                  <span className="font-semibold">{completionRate}%</span>
                </div>
                <div className="mt-1 w-full bg-green-200 rounded-full h-1.5">
                  <div
                    className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};