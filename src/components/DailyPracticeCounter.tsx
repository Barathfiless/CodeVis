import { useEffect, useState } from "react";
import { Activity, Zap, Flame } from "lucide-react";

export const DailyPracticeCounter = () => {
  const [practiceCount, setPracticeCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<string>("");

  // Load practice count and streak from localStorage
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    const storedDate = localStorage.getItem("practiceDate");
    const storedCount = localStorage.getItem("practiceCount");
    const storedStreak = localStorage.getItem("streakCount");
    const lastStreakDate = localStorage.getItem("lastStreakDate");

    // Check if it's a new day
    if (storedDate !== today) {
      // Check if streak should continue or reset
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
      if (lastStreakDate === yesterday) {
        // Continue streak - increment for consecutive days
        const currentStreak = parseInt(storedStreak || "0", 10);
        setStreak(currentStreak + 1);
        localStorage.setItem("streakCount", (currentStreak + 1).toString());
      } else if (lastStreakDate && lastStreakDate !== today) {
        // Reset streak if not consecutive days
        setStreak(1);
        localStorage.setItem("streakCount", "1");
      } else {
        // First time or gap in streak
        setStreak(1);
        localStorage.setItem("streakCount", "1");
      }
      // Reset daily practice count for new day
      setPracticeCount(0);
      localStorage.setItem("practiceDate", today);
      localStorage.setItem("practiceCount", "0");
      localStorage.setItem("lastStreakDate", today);
      setLastResetDate(today);
    } else {
      // Same day - load existing values
      setPracticeCount(parseInt(storedCount || "0", 10));
      setStreak(parseInt(storedStreak || "0", 10));
      setLastResetDate(storedDate);
    }
  }, []);

  // Increment practice count when code runs successfully
  const incrementPractice = () => {
    const newCount = practiceCount + 1;
    setPracticeCount(newCount);
    const today = new Date().toLocaleDateString('en-CA');
    localStorage.setItem("practiceCount", newCount.toString());
    localStorage.setItem("practiceDate", today);
    localStorage.setItem("lastStreakDate", today);
  };

  // Expose function globally so it can be called from Index.tsx
  useEffect(() => {
    (window as any).incrementDailyPractice = incrementPractice;
  }, [practiceCount]);

  return (
    <div className="flex items-center gap-3">
      {/* Daily Solved Count */}
      <div className="flex items-center gap-1.5 cursor-help dark:text-success light:text-emerald-600" title={`Questions solved today (${new Date().toLocaleDateString('en-CA')})`}>
        <div className="relative">
          <Activity className="h-5 w-5 dark:text-primary light:text-blue-600" />
          <Zap className="h-3 w-3 dark:text-success light:text-emerald-600 absolute -bottom-1 -right-1" />
        </div>
        <span className="text-sm font-bold dark:text-success light:text-emerald-600">{practiceCount}</span>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center gap-1.5 cursor-help dark:text-white light:text-orange-600" title={`Consecutive days streak (Last updated: ${lastResetDate})`}>
        <Flame className="h-5 w-5 dark:text-white light:text-orange-600" />
        <span className="text-sm font-bold dark:text-white light:text-orange-600">{streak}</span>
      </div>
    </div>
  );
};
