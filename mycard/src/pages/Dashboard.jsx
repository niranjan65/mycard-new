import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Upload, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Mail,
  Bell,
  Play,
  Pause,
  Square,
  UserPlus,
  Zap,
  Globe,
  Layout,
  Lightbulb,
  Smartphone,
  IdCard,
  UserPen,
  Hospital,
  Landmark,
  ChartCandlestick
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timerTime, setTimerTime] = useState({ hours: 1, minutes: 24, seconds: 8 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (isTimerRunning) {
        setTimerTime(prev => {
          let newSeconds = prev.seconds + 1;
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          
          if (newSeconds >= 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
          }
          
          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const chartData = [
    { day: 'S', value: 20 },
    { day: 'M', value: 85 },
    { day: 'T', value: 75 },
    { day: 'W', value: 95 },
    { day: 'T', value: 60 },
    { day: 'F', value: 40 },
    { day: 'S', value: 30 }
  ];

  const teamMembers = [
    { name: 'Alexandra Deff', role: 'Working on Github Project Repository', status: 'Completed', avatar: '👩‍💼' },
    { name: 'Edwin Adenike', role: 'Working on Integrate User Authentication System', status: 'In Progress', avatar: '👨‍💻' },
    { name: 'Isaac Oluwatemiloun', role: 'Working on Develop Search and Filter Functionality', status: 'Pending', avatar: '👨‍🔬' },
    { name: 'David Ochoai', role: 'Working on Responsive Layout for Homepage', status: 'In Progress', avatar: '👨‍🎨' }
  ];

  const projectTasks = [
    { name: 'Develop API Endpoints', icon: Zap, color: 'text-blue-500', date: 'Yesterday 12:43 pm' },
    { name: 'Onboarding Flow', icon: Globe, color: 'text-green-500', date: 'Yesterday 10:23 am' },
    { name: 'Build Dashboard', icon: Layout, color: 'text-purple-500', date: 'Tuesday May 14, 2024' },
    { name: 'Optimize Page Load', icon: Lightbulb, color: 'text-yellow-500', date: 'Yesterday 08:30 am' },
    { name: 'Cross-Browser Testing', icon: Smartphone, color: 'text-pink-500', date: 'Yesterday 06:45 pm' }
  ];

  const formatTime = (time) => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <img src='/assets/erpnext/images/mycard-logo.png' />
        </div>

        <nav className="mt-6">
          <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600">
              <IdCard className="w-5 h-5 mr-3" />
              Card Blo Me
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <UserPen className="w-5 h-5 mr-3" />
              Mycard Profile
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">18</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Hospital className="w-5 h-5 mr-3" />
              Health Blo Me
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Landmark className="w-5 h-5 mr-3" />
              Bank Blo Me
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <ChartCandlestick className="w-5 h-5 mr-3" />
              Trade Blo Me
            </a>
          </div>

          <div className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-8">GENERAL</div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <HelpCircle className="w-5 h-5 mr-3" />
              Help
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </a>
          </div>
        </nav>

       
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search "
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">⌘F</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">Totok Michael</div>
                  <div className="text-xs text-gray-500">tmichael2@email.com</div>
                </div>
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=32&h=32&q=80" alt="Avatar" className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </button>
              </div>
            </div>
            <p className="text-gray-600">Plan, prioritize, and accomplish your tasks with ease.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium opacity-90">Total Projects</h3>
                <TrendingUp className="w-5 h-5 opacity-75" />
              </div>
              <div className="text-3xl font-bold mb-1">24</div>
              <div className="flex items-center text-xs opacity-75">
                <TrendingUp className="w-3 h-3 mr-1" />
                Increased from last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Ended Projects</h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">10</div>
              <div className="flex items-center text-xs text-gray-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                Increased from last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Running Projects</h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">12</div>
              <div className="flex items-center text-xs text-gray-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                Increased from last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Pending Project</h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">2</div>
              <div className="text-xs text-gray-500">On Discuss</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Analytics */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Analytics</h3>
                <div className="flex items-end justify-between h-32">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className={`w-8 rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                          item.value > 80 ? 'bg-blue-600' : item.value > 60 ? 'bg-blue-500' : 'bg-blue-300'
                        }`}
                        style={{ height: `${item.value}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Collaboration */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Team Collaboration</h3>
                  <button className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add Member
                  </button>
                </div>
                
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        member.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Reminders */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Reminders</h3>
                
                <div className="mb-6">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-1">Meeting with Arc Company</h4>
                    <p className="text-sm text-gray-600 mb-3">Monday May 20 • 04:00 pm</p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Start Meeting
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Project</h4>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      + New
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {projectTasks.map((task, index) => {
                      const IconComponent = task.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${task.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 text-sm">{task.name}</div>
                            <div className="text-xs text-gray-500">{task.date}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Project Progress */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Progress</h3>
                
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeDasharray="41, 100"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">41%</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">Project Ended</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                      Completed
                    </div>
                    <span className="text-gray-600">41%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                      In Progress
                    </div>
                    <span className="text-gray-600">35%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                      Pending
                    </div>
                    <span className="text-gray-600">24%</span>
                  </div>
                </div>
              </div>

              {/* Time Tracker */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-6">Time Tracker</h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold font-mono mb-2">
                    {formatTime(timerTime)}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerTime({ hours: 0, minutes: 0, seconds: 0 });
                    }}
                    className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                  >
                    <Square className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;