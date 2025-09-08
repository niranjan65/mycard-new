import React from 'react';

const BeautifulLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      {/* Main loader container */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-32 h-32 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-spin">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 m-1"></div>
        </div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse opacity-80 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {/* Center dot with bounce animation */}
            <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-pink-400 animate-ping"></div>
        <div className="absolute -top-1 -right-3 w-3 h-3 rounded-full bg-cyan-400 animate-ping animation-delay-300"></div>
        <div className="absolute -bottom-2 -left-3 w-2 h-2 rounded-full bg-purple-400 animate-ping animation-delay-700"></div>
        <div className="absolute -bottom-1 -right-2 w-3 h-3 rounded-full bg-yellow-400 animate-ping animation-delay-1000"></div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin animation-duration-3000">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-red-400"></div>
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"></div>
          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="text-white font-semibold text-lg animate-pulse">Loading</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-300"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-700"></div>
          </div>
        </div>
      </div>
      
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-purple-500/10 animate-pulse animation-delay-500"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-cyan-500/10 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 rounded-full bg-pink-500/10 animate-pulse animation-delay-1500"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-yellow-500/10 animate-pulse animation-delay-2000"></div>
      </div>
      
      <style jsx>{`
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-duration-3000 {
          animation-duration: 3s;
        }
      `}</style>
    </div>
  );
};

export default BeautifulLoader;