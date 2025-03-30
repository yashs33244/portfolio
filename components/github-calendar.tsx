"use client";

import { useState, useEffect } from "react";

interface GitHubCalendarProps {
  username: string;
}

export function GitHubCalendar({ username }: GitHubCalendarProps) {
  const [contributionData, setContributionData] = useState<
    Record<string, number>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, we would fetch from GitHub's contribution API
    // For now, we'll generate mock data
    const generateMockData = () => {
      const mockData: Record<string, number> = {};
      // Generate data for last 70 days
      for (let i = 0; i < 70; i++) {
        // Current date minus i days, converted to yyyy-MM-dd format
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        // Random contribution count between 0 and 10
        mockData[dateStr] = Math.floor(Math.random() * 10);
      }
      return mockData;
    };

    setIsLoading(true);

    // Simulate API fetch
    setTimeout(() => {
      setContributionData(generateMockData());
      setIsLoading(false);
    }, 500);
  }, [username]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 70 }).map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-sm bg-gray-100 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  // Sort entries by date
  const sortedEntries = Object.entries(contributionData).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  // Get max contribution count for scaling intensity
  const maxCount = Math.max(...Object.values(contributionData), 1);

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-7 gap-1">
        {sortedEntries.map(([date, count], index) => {
          // Calculate intensity based on contribution count (0-4)
          const intensity = Math.min(Math.floor((count / maxCount) * 5), 4);

          // Map intensity to a color
          let bgColor;
          switch (intensity) {
            case 0:
              bgColor = "bg-gray-100";
              break;
            case 1:
              bgColor = "bg-primary-100";
              break;
            case 2:
              bgColor = "bg-primary-300";
              break;
            case 3:
              bgColor = "bg-primary-500";
              break;
            case 4:
              bgColor = "bg-primary-700";
              break;
            default:
              bgColor = "bg-gray-100";
          }

          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString();

          return (
            <div
              key={index}
              className={`w-3 h-3 rounded-sm ${bgColor}`}
              title={`${formattedDate}: ${count} contributions`}
            ></div>
          );
        })}
      </div>
      <div className="text-xs text-center mt-2 text-muted-foreground">
        Contribution activity for @{username}
      </div>
    </div>
  );
}
