import React from 'react';

interface Day154GridProps {
  className?: string;
}

const Day154Grid: React.FC<Day154GridProps> = ({ className = '' }) => {
  // Calculate current day number (1-154) based on start date 01/08/2025
  const startDate = new Date('2025-08-01'); // Fixed: August 1st, 2025
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const currentDay = Math.max(1, Math.min(154, daysDiff + 1));

  // Generate grid data - 7 rows x 22 columns = 154 days
  const generateGridData = () => {
    const grid = [];
    for (let day = 1; day <= 154; day++) {
      const row = Math.floor((day - 1) / 22);
      const col = (day - 1) % 22;
      
      // Only show activity (dark green) for days that have passed
      let activityLevel = 0;
      if (day < currentDay) { // Changed: only past days are green, not including today
        activityLevel = 4; // Dark green for completed days
      }
      
      grid.push({
        day,
        row,
        col,
        activityLevel,
        isToday: day === currentDay
      });
    }
    return grid;
  };

  const gridData = generateGridData();

  // Generate week numbers (1-22)
  const weekNumbers = Array.from({ length: 22 }, (_, i) => i + 1);

  // Activity level colors (GitHub-style green scale)
  const getActivityColor = (level: number) => {
    const colors = [
      '#d1d5db', // 0 - no activity (darker gray)
      '#9be9a8', // 1 - low activity
      '#40c463', // 2 - medium-low activity
      '#30a14e', // 3 - medium-high activity
      '#216e39'  // 4 - high activity
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className={`bg-wgite p-4 ${className}`}>
      {/* Title */}
      <div className="mb-2">
        
        <h3 className="text-lg text-gray-600">weeks</h3>
      </div>

      {/* Week numbers header */}
      <div className="mb-2">
        <div className="grid grid-cols-22 gap-1">
          {weekNumbers.map(week => (
            <div key={week} className="text-xs text-gray-500 text-center w-4">
              {week}
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="mb-4">
        {/* Grid squares */}
        <div className="grid grid-cols-22 gap-1">
          {Array.from({ length: 7 * 22 }, (_, i) => {
            const dayData = gridData.find(d => d.row === Math.floor(i / 22) && d.col === i % 22);
            return (
              <div
                key={i}
                className={`w-5 h-5 border rounded-sm ${dayData?.isToday ? 'ring-2 ring-blue-400' : ''}`}
                style={{
                  backgroundColor: dayData ? getActivityColor(dayData.activityLevel) : '#d1d5db'
                }}
                title={dayData ? `Day ${dayData.day}` : ''}
              />
            );
          })}
        </div>
      </div>

      {/* Legend and Current Day - Same Line */}
      <div className="flex items-center justify-between mb-4">
        {/* Current day indicator - Left aligned */}
        <p className="text-xl font-bold text-gray-700">
          today is day <span>{currentDay}</span>
        </p>
        
        {/* Legend - Right aligned */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1" >
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#d1d5db' }}></div>
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#d1d5db' }}></div>
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#9be9a8' }}></div>
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#40c463' }}></div>
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#30a14e' }}></div>
            <div className="w-5 h-5 border rounded-sm" style={{ backgroundColor: '#216e39' }}></div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Day154Grid;