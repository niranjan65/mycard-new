// import React, { useState, useMemo } from 'react';
// import { Bell, TrendingUp, Users, CreditCard, Gift, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
// import Cookies from 'js-cookie';

// const LoyaltyDashboard = () => {
//   const [selectedFilter, setSelectedFilter] = useState('weekly');
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const user_name = Cookies.get('full_name');

//   // Sample data for different time periods (simulating API data)
//   const generateData = (period, count) => {
//     const data = [];
//     const now = new Date();
    
//     for (let i = count - 1; i >= 0; i--) {
//       const date = new Date(now);
//       let label = '';
      
//       switch (period) {
//         case 'daily':
//           date.setDate(now.getDate() - i);
//           label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//           break;
//         case 'weekly':
//           date.setDate(now.getDate() - (i * 7));
//           label = `Week ${count - i}`;
//           break;
//         case 'monthly':
//           date.setMonth(now.getMonth() - i);
//           label = date.toLocaleDateString('en-US', { month: 'short' });
//           break;
//         case 'yearly':
//           date.setFullYear(now.getFullYear() - i);
//           label = date.getFullYear().toString();
//           break;
//       }
      
//       data.push({
//         label,
//         value: Math.floor(Math.random() * 40) + 30, // Random value between 30-70
//         points: Math.floor(Math.random() * 100) + 50,
//         amount: Math.floor(Math.random() * 5000) + 1000
//       });
//     }
//     return data;
//   };

//   const filterOptions = {
//     daily: { label: 'Daily', count: 30, maxDays: 30 },
//     weekly: { label: 'Weekly', count: 12, maxDays: 84 },
//     monthly: { label: 'Monthly', count: 12, maxDays: 365 },
//     yearly: { label: 'Yearly', count: 1, maxDays: 365 }
//   };

//   const chartData = useMemo(() => {
//     const option = filterOptions[selectedFilter];
//     return generateData(selectedFilter, option.count);
//   }, [selectedFilter]);

//   // Calculate metrics based on current data
//   const metrics = useMemo(() => {
//     const totalPoints = chartData.reduce((sum, item) => sum + item.points, 0);
//     const avgUtilization = chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length;
//     const totalAmount = chartData.reduce((sum, item) => sum + item.amount, 0);
    
//     return {
//       totalPoints,
//       avgUtilization: Math.round(avgUtilization),
//       totalAmount,
//       engagementHours: Math.round(avgUtilization * 0.5) // Simulated hours
//     };
//   }, [chartData]);

//   const FilterDropdown = () => (
//     <div className="relative">
//       <button 
//         onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//         className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//       >
//         <Calendar className="w-4 h-4" />
//         {filterOptions[selectedFilter].label}
//         <ChevronDown className="w-4 h-4" />
//       </button>
      
//       {showFilterDropdown && (
//         <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//           {Object.entries(filterOptions).map(([key, option]) => (
//             <button
//               key={key}
//               onClick={() => {
//                 setSelectedFilter(key);
//                 setShowFilterDropdown(false);
//               }}
//               className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
//                 selectedFilter === key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-gray-600 mt-1">Loyalty Program Analytics</p>
//           </div>
//           <FilterDropdown />
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
//           {/* Left Column - Welcome Card */}
//           <div className="xl:col-span-4">
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
//               {/* Header */}
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <div className="flex items-center gap-3 mb-2">
//                     <h2 className="text-2xl font-bold text-gray-900">Hey {user_name}</h2>
//                     <span className="text-2xl">👋</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Bell className="w-4 h-4 text-orange-500" />
//                     <span className="text-gray-600 text-sm">You Have (3) Alerts</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Circular Progress */}
//               <div className="relative w-56 h-56 mx-auto mb-8">
//                 <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 120 120">
//                   {/* Background circle */}
//                   <circle
//                     cx="60"
//                     cy="60"
//                     r="45"
//                     fill="none"
//                     stroke="#f1f5f9"
//                     strokeWidth="10"
//                   />
//                   {/* Progress circle */}
//                   <circle
//                     cx="60"
//                     cy="60"
//                     r="45"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="10"
//                     strokeDasharray={`${metrics.avgUtilization * 2.83} 283`}
//                     strokeLinecap="round"
//                     className="transition-all duration-1000 ease-out"
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                       <stop offset="0%" stopColor="#f97316" />
//                       <stop offset="100%" stopColor="#ea580c" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <div className="text-5xl font-bold text-gray-900 mb-1">{metrics.avgUtilization}%</div>
//                     <div className="text-sm font-medium text-gray-600 mb-1">Your Loyalty Score</div>
//                     <div className="text-xs text-gray-400">{metrics.totalPoints}/1000</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 mb-6">
//                 <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
//                   <CreditCard className="w-4 h-4" />
//                   Programs
//                 </button>
//                 <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
//                   <Gift className="w-4 h-4" />
//                   Rewards
//                 </button>
//               </div>

//               {/* Footer */}
//               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                 <span className="text-xs text-gray-500">Check Last Update 9th Oct</span>
//                 <button className="text-blue-600 hover:text-blue-700 text-xs font-medium transition-colors">Take action</button>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Charts and Stats */}
//           <div className="xl:col-span-8">
//             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
              
//               {/* Header */}
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">Program Engagement</h3>
//                   <div className="flex items-center gap-3">
//                     <span className="text-3xl font-bold text-gray-900">{metrics.engagementHours}.9 hr</span>
//                     <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
//                       +{Math.round(metrics.avgUtilization * 0.3)}%
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500">Average {filterOptions[selectedFilter].label.toLowerCase()} engagement</span>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Programs</button>
//                   <button className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">App</button>
//                   <button className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">All</button>
//                 </div>
//               </div>

//               {/* Bar Chart */}
//               <div className="mb-8">
//                 <div className="flex items-end justify-between h-40 px-2">
//                   {chartData.map((item, index) => (
//                     <div key={index} className="flex flex-col items-center gap-3 flex-1 max-w-12">
//                       <div className="relative group">
//                         <div 
//                           className={`w-8 rounded-t-lg transition-all duration-500 ease-out ${
//                             index === chartData.length - 1 
//                               ? 'bg-gradient-to-t from-indigo-600 to-indigo-500' 
//                               : 'bg-gradient-to-t from-blue-200 to-blue-100'
//                           }`}
//                           style={{ 
//                             height: `${Math.max((item.value / 70) * 160, 12)}px`,
//                             animationDelay: `${index * 100}ms`
//                           }}
//                         ></div>
//                         {/* Tooltip */}
//                         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                           {item.value}% - {item.points} pts
//                         </div>
//                       </div>
//                       <span className="text-xs text-gray-500 writing-mode-vertical text-center leading-tight" style={{writingMode: 'horizontal-tb'}}>
//                         {item.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Bottom Stats Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
//                 {/* Monthly Revenue */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                     <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">MONTHLY REVENUE</span>
//                     <ArrowUpRight className="w-4 h-4 text-gray-400" />
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl font-bold text-gray-900">$ {(metrics.totalAmount / 1000).toFixed(1)}k</span>
//                     <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
//                       +8.2%
//                     </span>
//                   </div>
                  
//                   {/* Mini Chart */}
//                   <div className="h-16 flex items-end justify-between gap-1">
//                     {chartData.slice(-8).map((item, index) => (
//                       <div key={index} className="relative group flex-1">
//                         <div 
//                           className="bg-blue-200 rounded-sm w-full transition-all duration-300"
//                           style={{ height: `${Math.max((item.amount / 5000) * 64, 4)}px` }}
//                         ></div>
//                         {index === 5 && (
//                           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
//                             ${(item.amount / 1000).toFixed(1)}k
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Active Users */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">ACTIVE USERS</span>
//                     <ArrowUpRight className="w-4 h-4 text-gray-400" />
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl font-bold text-gray-900">{Math.floor(metrics.totalPoints / 10)}</span>
//                     <span className="text-sm text-gray-500">12 New Users</span>
//                   </div>
                  
//                   <div className="pt-2">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">DEVICES</span>
//                       <ArrowUpRight className="w-4 h-4 text-gray-400" />
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl font-bold text-gray-900">1.{Math.floor(metrics.totalPoints / 100)}k</span>
//                       <span className="text-sm text-gray-500">11 New Devices</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Loyalty Programs */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                     <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">PROGRAMS</span>
//                     <ArrowUpRight className="w-4 h-4 text-gray-400" />
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl font-bold text-gray-900">{Math.floor(metrics.totalPoints / 50)}</span>
//                     <span className="text-sm text-gray-500">4 New Programs</span>
//                   </div>

//                   <div className="pt-2">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
//                       <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">POINTS ISSUED</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl font-bold text-gray-900">{(metrics.totalPoints / 1000).toFixed(1)}k</span>
//                       <span className="text-sm text-gray-500">This {selectedFilter.slice(0, -2)}</span>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoyaltyDashboard;





// import React, { useState, useEffect, useMemo } from 'react';
// import { Gift, CreditCard, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { set } from 'react-hook-form';


// const LoyaltyDashboard = () => {
//   const [loyaltyData, setLoyaltyData] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState('all');
//   const [showDropdown, setShowDropdown] = useState(false);


//   const getLoyaltyPointsEntryFromLbl = async () => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
//       myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       fetch(`https://lblerp.anantdv.com/api/resource/Loyalty Point Entry?fields=[\"*\"]&filters=[["customer", "=", "Sita Geeta"]]`, requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           setLoyaltyData(result.data);
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {

//     }
//   }

//   useEffect(() => {
//     getLoyaltyPointsEntryFromLbl();
//   }, [])
  

//   const customers = useMemo(
//     () => [...new Set(loyaltyData.map(item => item.customer))], 
//     [loyaltyData]
//   );

//   const filteredData = useMemo(() => {
//     if (selectedCustomer === 'all') return loyaltyData;
//     return loyaltyData.filter(item => item.customer === selectedCustomer);
//   }, [loyaltyData, selectedCustomer]);

//   const metrics = useMemo(() => {
//     const totalPoints = filteredData.reduce((sum, item) => sum + (item.loyalty_points || 0), 0);
//     const totalPurchase = filteredData.reduce((sum, item) => sum + (item.purchase_amount || 0), 0);
//     const uniquePrograms = [...new Set(filteredData.map(item => item.loyalty_program))].length;
//     return {
//       totalPoints,
//       totalPurchase,
//       uniquePrograms,
//       uniqueCustomers: [...new Set(filteredData.map(item => item.customer))].length
//     };
//   }, [filteredData]);

//   const chartData = {
//     labels: filteredData.map(x => x.posting_date),
//     datasets: [{
//       label: 'Loyalty Points',
//       data: filteredData.map(x => x.loyalty_points),
//       backgroundColor: 'rgba(99, 102, 241, 0.7)',
//     }]
//   };

  

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Loyalty Dashboard</h1>
//             <p className="text-gray-500 mt-1">Company: LOTIC BIGE LTD</p>
//           </div>
//           <div className="relative">
//             <button
//               className="flex items-center gap-2 p-3 border rounded-lg bg-white text-gray-800"
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               <Calendar className="w-4 h-4" />
//               {selectedCustomer === 'all' ? 'All Customers' : selectedCustomer}
//               <ChevronDown className="w-4 h-4" />
//             </button>
//             {showDropdown && (
//               <div className="absolute mt-2 bg-white border shadow-lg rounded z-10 w-40 left-0">
//                 <button className="block px-4 py-2 w-full hover:bg-blue-50"
//                   onClick={() => {setSelectedCustomer('all');setShowDropdown(false);}}>
//                   All Customers
//                 </button>
//                 {customers.map(cust => (
//                   <button key={cust} className="block px-4 py-2 w-full hover:bg-blue-50"
//                     onClick={() => {setSelectedCustomer(cust);setShowDropdown(false);}}>
//                     {cust}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
//             <Gift className="w-8 h-8 text-purple-500 mb-2" />
//             <span className="text-sm text-gray-500">Total Points</span>
//             <h2 className="text-2xl font-bold text-gray-900">{metrics.totalPoints}</h2>
//           </div>
//           <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
//             <CreditCard className="w-8 h-8 text-blue-500 mb-2" />
//             <span className="text-sm text-gray-500">Total Purchases</span>
//             <h2 className="text-2xl font-bold text-gray-900">{metrics.totalPurchase}</h2>
//           </div>
//           <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
//             <ArrowUpRight className="w-8 h-8 text-green-500 mb-2" />
//             <span className="text-sm text-gray-500">Programs</span>
//             <h2 className="text-2xl font-bold text-gray-900">{metrics.uniquePrograms}</h2>
//           </div>
//           <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
//             <Gift className="w-8 h-8 text-orange-500 mb-2" />
//             <span className="text-sm text-gray-500">Customers</span>
//             <h2 className="text-2xl font-bold text-gray-900">{metrics.uniqueCustomers}</h2>
//           </div>
//         </div>

//         {/* Chart */}
//         <div className="bg-white rounded-lg p-6 shadow mb-8">
//           <h3 className="text-lg font-bold mb-4 text-gray-800">Loyalty Points Trend</h3>
//           <Bar data={chartData} />
//         </div>

//         {/* Data Table */}
//         <div className="bg-white rounded-lg p-6 shadow">
//           <h3 className="text-lg font-bold mb-4 text-gray-800">All Loyalty Entries</h3>
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Customer</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Date</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Program</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Points</th>
//                 <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Invoice</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, i) => (
//                 <tr key={row.name || i}>
//                   <td className="px-4 py-2">{row.customer}</td>
//                   <td className="px-4 py-2">{row.posting_date}</td>
//                   <td className="px-4 py-2">{row.loyalty_program}</td>
//                   <td className="px-4 py-2">{row.loyalty_points}</td>
//                   <td className="px-4 py-2">{row.invoice || '-'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoyaltyDashboard;





import React, { useState, useEffect, useMemo } from 'react';
import { Gift, CreditCard, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { format, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

// Helper for date filtering
const filterByDate = (data, filterType, selectedDate) => {
  if (filterType === 'all' || !selectedDate) return data;
  const dateObj = new Date(selectedDate);
  let interval = null;
  switch (filterType) {
    case 'day':
      interval = { start: dateObj, end: dateObj };
      break;
    case 'week':
      interval = { start: startOfWeek(dateObj), end: endOfWeek(dateObj) };
      break;
    case 'month':
      interval = { start: startOfMonth(dateObj), end: endOfMonth(dateObj) };
      break;
    case 'year':
      interval = { start: startOfYear(dateObj), end: endOfYear(dateObj) };
      break;
    default:
      return data;
  }
  return data.filter(row =>
    isWithinInterval(
      new Date(row.posting_date),
      interval
    )
  );
};

// Aggregate loyalty points by day/month/year for chart
const aggregatePointsByPeriod = (data, period) => {
  const grouped = {};
  data.forEach(item => {
    let key = '';
    const date = new Date(item.posting_date);
    if (!item.posting_date) return; // skip if no date
    if (period === 'day') key = format(date, 'yyyy-MM-dd');
    else if (period === 'month') key = format(date, 'yyyy-MM');
    else if (period === 'year') key = format(date, 'yyyy');

    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += item.loyalty_points || 0;
  });

  const labels = Object.keys(grouped).sort();
  const dataPoints = labels.map(label => grouped[label]);

  return { labels, dataPoints };
};

const LoyaltyDashboard = () => {
  const [loyaltyData, setLoyaltyData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('Niranjan Singh');
  const [showDropdown, setShowDropdown] = useState(false);

  const [filterType, setFilterType] = useState('all'); // all, day, week, month, year
  const [selectedDate, setSelectedDate] = useState('');

  const getLoyaltyPointsEntryFromLbl = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "token e0723ce34466cea:79dca2f515d4e2c");
      myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const customerFilter = selectedCustomer === 'all' ? '' : selectedCustomer;

      // fetch(`https://lblerp.anantdv.com/api/resource/Loyalty Point Entry?fields=["*"]${customerFilter ? `&filters=[["customer", "=", "${customerFilter}"]]` : ''}`, requestOptions)
      fetch(`https://lblerp.anantdv.com/api/resource/Loyalty Point Entry?fields=["*"]${customerFilter ? `&filters=[["customer", "=", "${customerFilter}"]]` : ''}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoyaltyData(result.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {}
  };


  console.log("loyalty data....", loyaltyData)

  useEffect(() => {
    getLoyaltyPointsEntryFromLbl();
    // eslint-disable-next-line
  }, [selectedCustomer]);

  const customers = useMemo(
    () => [...new Set(loyaltyData.map(item => item.customer))],
    [loyaltyData]
  );

  const filteredByDate = useMemo(
    () => filterByDate(loyaltyData, filterType, selectedDate),
    [loyaltyData, filterType, selectedDate]
  );

  const filteredData = useMemo(
    () => filteredByDate.filter(item => selectedCustomer === 'all' || item.customer === selectedCustomer),
    [filteredByDate, selectedCustomer]
  );

  const metrics = useMemo(() => {
    const totalPoints = filteredData.reduce((sum, item) => sum + (item.loyalty_points || 0), 0);
    const totalPurchase = filteredData.reduce((sum, item) => sum + (item.purchase_amount || 0), 0);
    const uniquePrograms = [...new Set(filteredData.map(item => item.loyalty_program))].length;
    return {
      totalPoints,
      totalPurchase,
      uniquePrograms,
      uniqueCustomers: [...new Set(filteredData.map(item => item.customer))].length
    };
  }, [filteredData]);

  const { labels, dataPoints } = useMemo(
    () => aggregatePointsByPeriod(filteredData, filterType === 'all' ? 'day' : filterType),
    [filteredData, filterType]
  );

  const chartData = {
    labels,
    datasets: [{
      label: 'Loyalty Points',
      data: dataPoints,
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Loyalty Dashboard</h1>
            <p className="text-gray-500 mt-1">Company: LOTIC BIGE LTD</p>
          </div>
          <div className="flex gap-2">
            {/* Filter Type Dropdown */}
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border rounded px-2 py-1 text-gray-800"
            >
              <option value="all">All Dates (Day-wise chart)</option>
              <option value="day">Day</option>
              <option value="week">Week (date filter only)</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            {/* Date Picker */}
            {filterType !== 'all' && (
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="border rounded px-2 py-1 text-gray-800"
              />
            )}
            {/* Customer Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-3 border rounded-lg bg-white text-gray-800"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Calendar className="w-4 h-4" />
                {selectedCustomer === 'all' ? 'All Customers' : selectedCustomer}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showDropdown && (
                <div className="absolute mt-2 bg-white border shadow-lg rounded z-10 w-40 left-0">
                  <button className="block px-4 py-2 w-full hover:bg-blue-50"
                    onClick={() => { setSelectedCustomer('all'); setShowDropdown(false); }}>
                    All Customers
                  </button>
                  {customers.map(cust => (
                    <button key={cust} className="block px-4 py-2 w-full hover:bg-blue-50"
                      onClick={() => { setSelectedCustomer(cust); setShowDropdown(false); }}>
                      {cust}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
            <Gift className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm text-gray-500">Total Points</span>
            <h2 className="text-2xl font-bold text-gray-900">{metrics.totalPoints}</h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
            <CreditCard className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm text-gray-500">Total Purchases</span>
            <h2 className="text-2xl font-bold text-gray-900">{metrics.totalPurchase}</h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
            <ArrowUpRight className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm text-gray-500">Programs</span>
            <h2 className="text-2xl font-bold text-gray-900">{metrics.uniquePrograms}</h2>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex flex-col items-center">
            <Gift className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-sm text-gray-500">Customers</span>
            <h2 className="text-2xl font-bold text-gray-900">{metrics.uniqueCustomers}</h2>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg p-6 shadow mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Loyalty Points Trend</h3>
          <Bar data={chartData} />
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-bold mb-4 text-gray-800">All Loyalty Entries</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Program</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Points</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={row.name || i}>
                  <td className="px-4 py-2">{row.customer}</td>
                  <td className="px-4 py-2">{row.posting_date}</td>
                  <td className="px-4 py-2">{row.loyalty_program}</td>
                  <td className="px-4 py-2">{row.loyalty_points}</td>
                  <td className="px-4 py-2">{row.invoice || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;
