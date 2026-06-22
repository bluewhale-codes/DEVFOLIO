import React, { useState, useEffect, useMemo } from 'react';
import {
  ClipboardList,
  Clock,
  UserCheck,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Bell,
  Menu,
  ChevronDown,
  MapPin,
  User,
  Calendar,
  AlertCircle,
  CheckSquare,
  MoreHorizontal,
  Image as ImageIcon,
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RefreshCw,
  WifiOff,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router';

const API_URL = 'https://swachh-pu-backend.onrender.com/tasks/public/list';

/* ───────────────────────────────────────────────
   UTILITY FUNCTIONS
   ─────────────────────────────────────────────── */
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${day} ${month} ${year}\\n${displayHours}:${minutes} ${ampm}`;
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'assigned': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'completed': return 'bg-green-50 text-green-700 border-green-200';
    case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getStatusDot = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'bg-orange-500';
    case 'assigned': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const shortenId = (id) => id ? id.split('-')[0] : '—';

const isValidUrl = (str) => {
  if (!str) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const isImageUrl = (url) => {
  if (!isValidUrl(url)) return false;
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
};

const isAudioUrl = (url) => {
  if (!isValidUrl(url)) return false;
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  return ['m4a', 'mp3', 'wav', 'ogg', 'aac'].includes(ext);
};

/* ───────────────────────────────────────────────
   REUSABLE COMPONENTS
   ─────────────────────────────────────────────── */

const TopNavigation = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-200/80 backdrop-blur-xl bg-white/90">
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <Menu size={20} strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center">
              <CheckSquare size={16} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-lg hidden sm:block">Swachh PU</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              3
            </span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">Admin</span>
            <ChevronDown size={14} className="text-gray-400 hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 p-5 group cursor-default">
      <div className="flex items-start justify-between">
        <div className="space-y-3 min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color] || colorClasses.gray} transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

const TaskStats = ({ tasks }) => {
  const stats = [
    { title: 'Total Tasks', value: tasks.length, icon: ClipboardList, color: 'blue' },
    { title: 'Pending', value: tasks.filter(t => t.status === 'pending').length, icon: Clock, color: 'orange' },
    { title: 'Assigned', value: tasks.filter(t => t.status === 'assigned').length, icon: UserCheck, color: 'blue' },
    { title: 'Completed', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle, color: 'green' },
    { title: 'Rejected', value: tasks.filter(t => t.status === 'rejected').length, icon: XCircle, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

const TaskFilters = ({ search, setSearch, statusFilter, setStatusFilter, workerFilter, setWorkerFilter, dateFilter, setDateFilter, tasks }) => {
  const uniqueWorkers = [...new Set(tasks.filter(t => t.assigned_to).map(t => t.assigned_to))];

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks by description or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full sm:w-40 pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={workerFilter}
              onChange={(e) => setWorkerFilter(e.target.value)}
              className="appearance-none w-full sm:w-44 pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
            >
              <option value="all">All Workers</option>
              <option value="unassigned">Unassigned</option>
              {uniqueWorkers.map(wid => (
                <option key={wid} value={wid}>Worker {shortenId(wid)}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none w-full sm:w-40 pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last Month</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20">
            <Filter size={15} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskRow = ({ task, onView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasValidPhoto = isImageUrl(task.photo_url);
  const hasValidAudio = isAudioUrl(task.audio_url);
  const navigate = useNavigate();

  return (
    <tr
      className="group hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView(task.id)}
    >
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {hasValidPhoto ? (
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
              <img
                src={task.photo_url}
                alt={task.description}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <ImageIcon size={18} className="text-gray-400" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{task.description}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-gray-500 font-mono">ID: {shortenId(task.id)}</p>
              {hasValidAudio && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-medium border border-purple-100">
                  <Headphones size={9} />
                  Audio
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={13} className="text-gray-500" />
          </div>
          <span className="text-sm text-gray-500">
            {task.creator_name || '—'}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {task.assigned_to ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
              <UserCheck size={13} className="text-blue-600" />
            </div>
            <span className="text-sm text-gray-700 font-mono">{shortenId(task.assigned_to)}</span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
            <AlertCircle size={10} />
            Unassigned
          </span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(task.status)}`} />
          {task.status ? task.status.charAt(0).toUpperCase() + task.status.slice(1) : 'Unknown'}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex flex-col text-xs text-gray-600 font-mono">
          <span className="flex items-center gap-1">
            <MapPin size={10} className="text-gray-400" />
            {task.latitude?.toFixed(4) ?? '—'}
          </span>
          <span className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-gray-400" />
            {task.longitude?.toFixed(4) ?? '—'}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
          {task.created_at ? formatDate(task.created_at) : '—'}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
       <button
  onClick={() => navigate(`/tasks/detail/${task.id}`)}
  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20"
>
  View Details
</button>
      </td>
    </tr>
  );
};

const TaskTable = ({ tasks, onView }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <ClipboardList size={28} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No tasks found</h3>
        <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200">
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reporter</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reported On</th>
              <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} onView={onView} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <p className="text-sm text-gray-500">
      Showing <span className="font-semibold text-gray-900">{totalItems}</span> tasks
    </p>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>
      <div className="flex items-center gap-1">
        <span className="px-3 py-2 text-sm font-semibold text-white bg-[#2563EB] rounded-lg min-w-[36px] text-center">
          {currentPage}
        </span>
        <span className="text-sm text-gray-400 px-1">of {totalPages}</span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const LoadingState = () => (
  <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-12 text-center">
    <div className="w-10 h-10 border-2 border-gray-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />
    <p className="text-sm text-gray-500">Loading tasks...</p>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="bg-white rounded-xl border border-red-200/80 shadow-sm p-12 text-center">
    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
      <WifiOff size={28} className="text-red-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load tasks</h3>
    <p className="text-sm text-gray-500 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      <RefreshCw size={15} />
      Retry
    </button>
  </div>
);

/* ───────────────────────────────────────────────
   CUSTOM HOOK: useFetchTasks
   ─────────────────────────────────────────────── */
const useFetchTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Handle the API response format: { tasks: [...], count: number }
      const taskList = data.tasks || data || [];
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message || 'Failed to fetch tasks from the server.');
      }
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, refetch: fetchTasks };
};

/* ───────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ─────────────────────────────────────────────── */
const TaskManagementPage = ({ onNavigate }) => {
  const { tasks, loading, error, refetch } = useFetchTasks();
const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [workerFilter, setWorkerFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.id && t.id.toLowerCase().includes(q)) ||
        (t.creator_name && t.creator_name.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (workerFilter !== 'all') {
      if (workerFilter === 'unassigned') {
        result = result.filter(t => !t.assigned_to);
      } else {
        result = result.filter(t => t.assigned_to === workerFilter);
      }
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(t => {
        if (!t.created_at) return false;
        const d = new Date(t.created_at);
        if (dateFilter === 'today') {
          return d.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return d >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return d >= monthAgo;
        }
        return true;
      });
    }

    return result;
  }, [tasks, search, statusFilter, workerFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / 10));

  const handleViewTask = (taskId) => {
    if (onNavigate) onNavigate('detail', taskId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopNavigation />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all reported tasks</p>
        </div>

        {/* Statistics Cards */}
        {!loading && !error && tasks.length > 0 && (
          <div className="mb-6">
            <TaskStats tasks={tasks} />
          </div>
        )}

        {/* Search & Filters */}
        {!loading && !error && (
          <div className="mb-6">
            <TaskFilters
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              workerFilter={workerFilter}
              setWorkerFilter={setWorkerFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              tasks={tasks}
            />
          </div>
        )}

        {/* Task Table */}
        <div className="mb-6">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} />
          ) : (
            <TaskTable tasks={filteredTasks} onView={handleViewTask} />
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTasks.length}
          />
        )}
      </main>
    </div>
  );
};

export default TaskManagementPage;