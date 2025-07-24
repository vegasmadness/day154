import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  // No props needed - calculates progress automatically
}

export default function ReadingProgress({}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Avoid division by zero for short pages
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50 shadow-sm">
      <div 
        className="h-full bg-gradient-to-r from-accent-green to-green-300 transition-all duration-200 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 8px rgba(16, 185, 129, 0.3)' : 'none'
        }}
      />
    </div>
  );
}