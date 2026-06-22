import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  MapPin,
  Calendar,
  User,
  Image as ImageIcon,
  Headphones,
  Play,
  Pause,
  Map as MapIcon,
  Activity,
  CheckSquare,
  Bell,
  Menu,
  ChevronDown,
  MoreHorizontal,
  Copy,
  Check,
  AlertCircle,
  Navigation,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ExternalLink,
  Download,
  Maximize2,
  Loader2
} from 'lucide-react';

/* ───────────────────────────────────────────────
   UTILITY FUNCTIONS
   ─────────────────────────────────────────────── */
const formatDateFull = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  return date.toLocaleString('en-US', options);
};

const formatDateRelative = (isoString) => {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return formatDateFull(isoString);
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

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return <Clock size={16} />;
    case 'assigned': return <UserCheck size={16} />;
    case 'completed': return <CheckCircle size={16} />;
    case 'rejected': return <XCircle size={16} />;
    default: return <AlertCircle size={16} />;
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

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );
};

const InfoRow = ({ label, value, icon: Icon, copyable, mono, children }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon size={15} className="text-gray-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
      <div className="flex items-center gap-2">
        {children || (
          <p className={`text-sm text-gray-900 ${mono ? 'font-mono' : 'font-medium'} break-all`}>{value}</p>
        )}
        {copyable && <CopyButton text={value} />}
      </div>
    </div>
  </div>
);

const TimelineItem = ({ icon: Icon, color, title, time, description, isLast }) => (
  <div className="relative flex gap-4 pb-6 last:pb-0">
    {!isLast && (
      <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gray-100" />
    )}
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0 z-10`}>
      <Icon size={14} className="text-white" />
    </div>
    <div className="flex-1 pt-0.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
      </div>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
  </div>
);

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hasAudio = isValidUrl(audioUrl);

  if (!hasAudio) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <Headphones size={32} className="text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">No audio recording available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm shadow-blue-500/20 flex-shrink-0"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700 truncate">Audio Recording</span>
            <span className="text-xs text-gray-400 font-mono tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div
            className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
      {/* Waveform visualization */}
      <div className="flex items-end gap-[2px] mt-4 px-2 h-8">
        {Array.from({ length: 60 }).map((_, i) => {
          const isActive = i < (progress / 100) * 60;
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${isActive ? 'bg-[#2563EB]' : 'bg-gray-200'}`}
              style={{ height: `${Math.max(15, Math.random() * 100)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};

const MapPlaceholder = ({ latitude, longitude }) => {
  const isValidCoords = latitude !== -90.0 && longitude !== -180.0 && latitude != null && longitude != null;
  const mapUrl = isValidCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`
    : null;

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-xl border border-gray-200 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 group">
      {isValidCoords && mapUrl ? (
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Task Location"
          className="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MapPin size={28} className="text-[#2563EB]" />
            </div>
            <p className="text-sm font-semibold text-gray-700">{latitude?.toFixed(4) ?? '—'}, {longitude?.toFixed(4) ?? '—'}</p>
            <p className="text-xs text-gray-400 mt-1">Coordinates are placeholder values</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {isValidCoords && (
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <ExternalLink size={12} />
            Open Maps
          </a>
        )}
      </div>
      <div className="absolute top-3 left-3 px-2.5 py-1.5 bg-white/90 backdrop-blur rounded-lg text-xs font-mono text-gray-700 shadow-sm border border-gray-200/50">
        {latitude?.toFixed(6) ?? '—'}, {longitude?.toFixed(6) ?? '—'}
      </div>
    </div>
  );
};

const PhotoPreview = ({ photoUrl, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const hasValidPhoto = isImageUrl(photoUrl);

  if (!hasValidPhoto) {
    return (
      <div className="relative w-full h-64 sm:h-80 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
          <ImageIcon size={36} className="text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">{photoUrl || 'No photo available'}</p>
        <p className="text-xs text-gray-400 mt-1">Photo preview unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 group">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-[#2563EB] rounded-full animate-spin" />
        </div>
      )}
      <img
        src={photoUrl}
        alt={description}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => { setHasError(true); setIsLoaded(true); }}
      />
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ImageIcon size={36} className="text-gray-300 mb-2" />
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <a
          href={photoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900"
          title="Open in new tab"
        >
          <ExternalLink size={16} />
        </a>
        <a
          href={photoUrl}
          download
          className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900"
          title="Download"
        >
          <Download size={16} />
        </a>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────
   MAIN DETAIL PAGE COMPONENT
   ─────────────────────────────────────────────── */
const TaskDetailPage = ({ onBack }) => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Fetch tasks from API and filter by ID from params
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://swachh-pu-backend.onrender.com/tasks/public/list');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const tasks = Array.isArray(data) ? data : data.tasks || [];
        const foundTask = tasks.find(t => t.id === id);
        
        if (!foundTask) {
          throw new Error('Task not found');
        }
        
        setTask(foundTask);
        setStatus(foundTask.status || 'pending');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Optionally update backend here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <TopNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-[#2563EB] animate-spin" />
            <p className="text-sm text-gray-500">Loading task details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <TopNavigation />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-sm mb-6"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <div className="bg-white rounded-xl border border-red-200 p-8 text-center max-w-lg mx-auto">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Error loading task</h2>
            <p className="text-sm text-gray-500">{error || 'Task not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const timelineEvents = [
    {
      icon: ClipboardList,
      color: 'bg-blue-500',
      title: 'Task Created',
      time: formatDateRelative(task.created_at),
      description: `Task reported with description: "${task.description}"`,
    },
    ...(task.assigned_to ? [{
      icon: UserCheck,
      color: 'bg-[#2563EB]',
      title: 'Task Assigned',
      time: formatDateRelative(task.updated_at),
      description: `Assigned to worker ${shortenId(task.assigned_to)}`,
    }] : []),
    {
      icon: Activity,
      color: 'bg-gray-400',
      title: 'Status Updated',
      time: 'Just now',
      description: `Current status: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopNavigation />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <ArrowLeft size={18} strokeWidth={2} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Task Details</h1>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(status)}`} />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-mono">{task.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAssignModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20"
            >
              <UserCheck size={16} />
              <span className="hidden sm:inline">Assign</span>
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-green-500/20"
            >
              <CheckCircle size={16} />
              <span className="hidden sm:inline">Complete</span>
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-red-500/20"
            >
              <XCircle size={16} />
              <span className="hidden sm:inline">Reject</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Task Info */}
          <div className="xl:col-span-2 space-y-6">
            {/* Task Overview Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Task Overview</h2>
              </div>
              <div className="p-6 space-y-1">
                <InfoRow
                  label="Task ID"
                  value={task.id}
                  icon={ClipboardList}
                  copyable
                  mono
                />
                <InfoRow
                  label="Description"
                  value={task.description}
                  icon={ClipboardList}
                />
                <InfoRow
                  label="Status"
                  icon={status === 'completed' ? CheckCircle : status === 'rejected' ? XCircle : status === 'pending' ? Clock : UserCheck}
                >
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(status)}`} />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </InfoRow>
                <InfoRow
                  label="Created At"
                  value={formatDateFull(task.created_at)}
                  icon={Calendar}
                />
                <InfoRow
                  label="Updated At"
                  value={formatDateFull(task.updated_at)}
                  icon={Activity}
                />
              </div>
            </div>

            {/* Photo Preview */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={16} className="text-gray-400" />
                  Photo Evidence
                </h2>
                {isImageUrl(task.photo_url) && (
                  <a
                    href={task.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2563EB] hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    View Full
                  </a>
                )}
              </div>
              <div className="p-6">
                <PhotoPreview photoUrl={task.photo_url} description={task.description} />
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Headphones size={16} className="text-gray-400" />
                  Audio Recording
                </h2>
                {isAudioUrl(task.audio_url) && (
                  <a
                    href={task.audio_url}
                    download
                    className="text-xs text-[#2563EB] hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Download size={12} />
                    Download
                  </a>
                )}
              </div>
              <div className="p-6">
                <AudioPlayer audioUrl={task.audio_url} />
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  Location
                </h2>
                {task.latitude !== -90.0 && task.latitude != null && (
                  <a
                    href={`https://www.google.com/maps?q=${task.latitude},${task.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2563EB] hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Navigation size={12} />
                    Open in Maps
                  </a>
                )}
              </div>
              <div className="p-6">
                <MapPlaceholder latitude={task.latitude} longitude={task.longitude} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Latitude</p>
                    <p className="text-sm font-mono font-semibold text-gray-900">{task.latitude?.toFixed(6) ?? '—'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Longitude</p>
                    <p className="text-sm font-mono font-semibold text-gray-900">{task.longitude?.toFixed(6) ?? '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - People & Timeline */}
          <div className="space-y-6">
            {/* Reporter Information */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Reporter</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {task.creator_name || 'Anonymous Reporter'}
                    </p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">ID: {shortenId(task.profile_id)}</p>
                    {!task.creator_name && (
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium">
                        <AlertCircle size={10} />
                        creator_name is null
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Worker */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Assigned Worker</h2>
              </div>
              <div className="p-6">
                {task.assigned_to ? (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-white shadow-sm flex items-center justify-center">
                      <UserCheck size={24} className="text-[#2563EB]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {task.assignee_name || 'Worker'}
                      </p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{task.assigned_to}</p>
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium border border-blue-100">
                        <UserCheck size={10} />
                        Currently Assigned
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <UserCheck size={24} className="text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">No worker assigned</p>
                      <p className="text-xs text-gray-400 mt-0.5">Assign a worker to this task</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity size={16} className="text-gray-400" />
                  Timeline
                </h2>
              </div>
              <div className="p-6">
                {timelineEvents.map((event, index) => (
                  <TimelineItem
                    key={index}
                    {...event}
                    isLast={index === timelineEvents.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleStatusChange('pending')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    status === 'pending'
                      ? 'bg-orange-50 text-orange-700 border border-orange-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-700 border border-transparent hover:border-orange-200'
                  }`}
                >
                  <Clock size={16} />
                  Mark as Pending
                </button>
                <button
                  onClick={() => handleStatusChange('assigned')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    status === 'assigned'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200'
                  }`}
                >
                  <UserCheck size={16} />
                  Mark as Assigned
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    status === 'completed'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200'
                  }`}
                >
                  <CheckCircle size={16} />
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    status === 'rejected'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200'
                  }`}
                >
                  <XCircle size={16} />
                  Mark as Rejected
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailPage;