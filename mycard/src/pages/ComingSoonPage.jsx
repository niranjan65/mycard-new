import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Coffee, Users, Zap } from 'lucide-react';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Launch date - March 15, 2025
  const launchDate = new Date('2025-03-15T09:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      setShowThanks(true);
      setEmail('');
      setTimeout(() => setShowThanks(false), 4000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`
        }}
      ></div>
      
      {/* Floating elements with natural movement */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-orange-300 rounded-full opacity-60" 
           style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.01}px)` }}></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-blue-200 rounded-full opacity-40"
           style={{ transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * 0.02}px)` }}></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-green-300 rounded-full opacity-50"
           style={{ transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.01}px)` }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header with authentic feel */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 font-medium">Currently in development</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Something great is
            <span className="text-indigo-600 block mt-2">coming soon</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're putting the finishing touches on our new platform. 
            It's going to change how you think about productivity forever.
          </p>
        </div>

        {/* Countdown with a more natural design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days, color: 'bg-red-500' },
            { label: 'Hours', value: timeLeft.hours, color: 'bg-blue-500' },
            { label: 'Minutes', value: timeLeft.minutes, color: 'bg-green-500' },
            { label: 'Seconds', value: timeLeft.seconds, color: 'bg-orange-500' }
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className={`w-4 h-1 ${item.color} rounded-full mb-4`}></div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Email signup with personality */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want early access?
          </h2>
          <p className="text-gray-600 mb-8">
            Join 2,847 others who'll get first dibs when we launch
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                className="px-6 py-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 group"
              >
                Get notified
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {showThanks && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                Perfect! You're on the list. We'll email you as soon as we're ready.
              </div>
            )}
          </div>
        </div>

        {/* What we're building section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 text-sm">
              Built from the ground up for speed. No more waiting around.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Team First</h3>
            <p className="text-gray-600 text-sm">
              Designed for teams who actually want to work together.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple & Clean</h3>
            <p className="text-gray-600 text-sm">
              No clutter. No confusion. Just the tools you need.
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Development Progress</h3>
            <span className="text-sm text-gray-500">85% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '85%' }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Currently working on final testing and polish. Almost there! 🚀
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Have questions? Drop us a line at <a href="mailto:hello@yourapp.com" className="text-indigo-600 hover:underline">hello@yourapp.com</a>
          </p>
          <p className="text-gray-400 text-xs">
            © 2025 YourApp Inc. Made with care in San Francisco.
          </p>
        </div>
      </div>
    </div>
  );
}