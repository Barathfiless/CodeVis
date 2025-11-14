import { useEffect, useState } from "react";
import { Activity, Zap, Flame } from "lucide-react";

export const DailyPracticeCounter = () => {
  const [practiceCount, setPracticeCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<string>("");

  // Load practice count and streak from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("practiceDate");
    const storedCount = localStorage.getItem("practiceCount");
    const storedStreak = localStorage.getItem("streakCount");
    const lastStreakDate = localStorage.getItem("lastStreakDate");

    // Reset count if it's a new day
    if (storedDate !== today) {
      // Check if streak should continue or reset
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastStreakDate === yesterday) {
        // Continue streak
        const currentStreak = parseInt(storedStreak || "0", 10);
        setStreak(currentStreak + 1);
        localStorage.setItem("streakCount", (currentStreak + 1).toString());
      } else {
        // Reset streak if not consecutive days
        setStreak(1);
        localStorage.setItem("streakCount", "1");
      }
      setPracticeCount(0);
      localStorage.setItem("practiceDate", today);
      localStorage.setItem("practiceCount", "0");
      localStorage.setItem("lastStreakDate", today);
      setLastResetDate(today);
    } else {
      setPracticeCount(parseInt(storedCount || "0", 10));
      setStreak(parseInt(storedStreak || "0", 10));
      setLastResetDate(storedDate);
    }
  }, []);

  // Increment practice count when code runs
  const incrementPractice = () => {
    const newCount = practiceCount + 1;
    setPracticeCount(newCount);
    localStorage.setItem("practiceCount", newCount.toString());
  };

  // Expose function globally so it can be called from Index.tsx
  useEffect(() => {
    (window as any).incrementDailyPractice = incrementPractice;
  }, [practiceCount]);

  return (
    <div className="flex items-center gap-3">
      {/* Daily Solved Count */}
      <div className="flex items-center gap-1.5 cursor-help" title="Daily solved count">
        <div className="relative">
          <Activity className="h-5 w-5 text-primary" />
          <Zap className="h-3 w-3 text-success absolute -bottom-1 -right-1" />
        </div>
        <span className="text-sm font-bold text-success">{practiceCount}</span>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-1.5 cursor-help" title="Consecutive days streak">
        <Flame className="h-5 w-5 text-warning" />
        <span className="text-sm font-bold text-warning">{streak}</span>
      </div>
    </div>
  );
};
