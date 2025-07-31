import React, { useState, useMemo } from 'react';
import { Task, TaskFilters } from './types/Task';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilters as TaskFiltersComponent } from './components/TaskFilters';
import { TaskStats } from './components/TaskStats';
import { Plus, CheckSquare, Loader2 } from 'lucide-react';

function App() {
  const {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    filterTasks,
    getTaskStats,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFilters>({});

  const filteredTasks = useMemo(() => filterTasks(filters), [tasks, filters]);
  const taskStats = useMemo(() => getTaskStats(), [tasks]);
  const categories = useMemo(() => {
    const categorySet = new Set(tasks.map(task => task.category));
    return Array.from(categorySet).sort();
  }, [tasks]);

  const handleCreateTask = (taskData: any) => {
    createTask(taskData);
    setIsFormOpen(false);
  };

  const handleUpdateTask = (taskData: any) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      deleteTask(id);
    }
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Cargando tareas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Gestor de Tareas
                </h1>
                <p className="text-gray-600 mt-1">
                  Organiza y gestiona tus tareas de manera eficiente
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </button>
          </div>
        </div>

        {/* Stats */}
        <TaskStats stats={taskStats} />

        {/* Filters */}
        <TaskFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
        />

        {/* Task List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Tareas ({filteredTasks.length})
            </h2>
          </div>
          
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Task Form Modal */}
        <TaskForm
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCloseForm}
          isOpen={isFormOpen || !!editingTask}
        />
      </div>
    </div>
  );
}

export default App;