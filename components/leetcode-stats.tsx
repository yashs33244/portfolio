"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { LeetCodeStats, LeetCodeCalendarEntry } from "@/types/leetcode";

// Mock data as fallback
const mockLeetCodeStats: LeetCodeStats = {
  totalSolved: 501,
  totalQuestions: 2500,
  easySolved: 147,
  totalEasy: 600,
  mediumSolved: 285,
  totalMedium: 1300,
  hardSolved: 69,
  totalHard: 600,
  acceptanceRate: 63.5,
  ranking: 136746,
  contributionPoints: 250,
  submissionCalendar: JSON.stringify(
    // Generate mock submission calendar for last 100 days
    Array.from({ length: 100 }).reduce((acc: Record<string, number>, _, i) => {
      // Current date minus i days, converted to seconds
      const date = Math.floor((Date.now() - i * 86400000) / 1000);
      // Random submission count between 0 and 10
      acc[date.toString()] = Math.floor(Math.random() * 10);
      return acc;
    }, {})
  ),
};

async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const submissionCalendarData = {
    "1711929600": 3,
    "1712016000": 1,
    "1712102400": 8,
    "1712188800": 9,
    "1712275200": 1,
    "1712361600": 1,
    "1712448000": 8,
    "1712534400": 8,
    "1712620800": 1,
    "1712707200": 12,
    "1712793600": 7,
    "1712880000": 1,
    "1712966400": 8,
    "1713052800": 4,
    "1713139200": 3,
    "1713225600": 19,
    "1713312000": 1,
    "1713398400": 11,
    "1713484800": 6,
    "1713571200": 4,
    "1713657600": 8,
    "1713744000": 1,
    "1713830400": 4,
    "1713916800": 1,
    "1714003200": 2,
    "1714089600": 2,
    "1714176000": 6,
    "1714262400": 3,
    "1714348800": 2,
    "1714435200": 1,
    "1714521600": 2,
    "1714608000": 2,
    "1714694400": 1,
    "1714780800": 1,
    "1714867200": 2,
    "1714953600": 1,
    "1715040000": 1,
    "1715126400": 1,
    "1715299200": 2,
    "1715385600": 1,
    "1715472000": 1,
    "1715558400": 15,
    "1715644800": 5,
    "1715731200": 2,
    "1715817600": 4,
    "1715904000": 4,
    "1715990400": 6,
    "1716076800": 4,
    "1716163200": 11,
    "1716249600": 1,
    "1716336000": 2,
    "1716422400": 2,
    "1716508800": 5,
    "1716595200": 3,
    "1716681600": 1,
    "1716768000": 4,
    "1716854400": 5,
    "1716940800": 2,
    "1717027200": 8,
    "1717113600": 2,
    "1717200000": 1,
    "1717286400": 3,
    "1717372800": 1,
    "1717459200": 5,
    "1717545600": 5,
    "1717632000": 5,
    "1717718400": 11,
    "1717804800": 3,
    "1717891200": 2,
    "1717977600": 4,
    "1718064000": 2,
    "1718150400": 10,
    "1718236800": 1,
    "1718323200": 2,
    "1718409600": 1,
    "1718496000": 14,
    "1718582400": 4,
    "1718668800": 1,
    "1718755200": 2,
    "1718841600": 6,
    "1718928000": 1,
    "1719014400": 1,
    "1719100800": 7,
    "1719187200": 1,
    "1719273600": 1,
    "1719360000": 3,
    "1719446400": 3,
    "1719532800": 3,
    "1719619200": 1,
    "1719705600": 2,
    "1719792000": 4,
    "1719878400": 2,
    "1719964800": 1,
    "1720051200": 1,
    "1720137600": 1,
    "1720224000": 2,
    "1720310400": 2,
    "1720396800": 3,
    "1720483200": 1,
    "1720569600": 1,
    "1720656000": 2,
    "1720742400": 8,
    "1720828800": 1,
    "1720915200": 1,
    "1721001600": 2,
    "1721088000": 1,
    "1721174400": 1,
    "1721260800": 9,
    "1721347200": 12,
    "1721433600": 1,
    "1721520000": 2,
    "1721606400": 1,
    "1721692800": 1,
    "1721779200": 1,
    "1721865600": 13,
    "1721952000": 2,
    "1722038400": 1,
    "1722124800": 8,
    "1722211200": 3,
    "1722297600": 14,
    "1722384000": 1,
    "1722470400": 12,
    "1722556800": 1,
    "1722643200": 2,
    "1722729600": 14,
    "1722816000": 1,
    "1722902400": 1,
    "1722988800": 5,
    "1723075200": 1,
    "1723161600": 4,
    "1723248000": 2,
    "1723334400": 4,
    "1723420800": 4,
    "1723507200": 3,
    "1723593600": 3,
    "1723680000": 4,
    "1723766400": 4,
    "1723852800": 1,
    "1723939200": 5,
    "1724025600": 6,
    "1724112000": 4,
    "1724198400": 2,
    "1724284800": 5,
    "1724371200": 1,
    "1724457600": 1,
    "1724544000": 1,
    "1724630400": 2,
    "1724716800": 1,
    "1724803200": 2,
    "1724889600": 2,
    "1724976000": 2,
    "1725062400": 8,
    "1725148800": 6,
    "1725235200": 3,
    "1725321600": 1,
    "1725408000": 3,
    "1725494400": 3,
    "1725580800": 1,
    "1725667200": 1,
    "1725753600": 2,
    "1725840000": 2,
    "1725926400": 5,
    "1726012800": 8,
    "1726099200": 1,
    "1726185600": 1,
    "1726272000": 3,
    "1726358400": 1,
    "1726444800": 8,
    "1726531200": 5,
    "1726617600": 2,
    "1726704000": 8,
    "1726790400": 8,
    "1726876800": 5,
    "1726963200": 2,
    "1727049600": 4,
    "1727136000": 11,
    "1727222400": 7,
    "1727308800": 3,
    "1727395200": 3,
    "1727481600": 2,
    "1727654400": 6,
    "1727740800": 5,
    "1727827200": 5,
    "1727913600": 13,
    "1728000000": 5,
    "1728172800": 3,
    "1728259200": 4,
    "1728345600": 2,
    "1728432000": 2,
    "1728518400": 1,
    "1728604800": 2,
    "1728691200": 5,
    "1728777600": 1,
    "1728864000": 1,
    "1728950400": 1,
    "1729123200": 1,
    "1729296000": 1,
    "1729382400": 6,
    "1729468800": 1,
    "1729728000": 1,
    "1730073600": 4,
    "1730160000": 1,
    "1730246400": 2,
    "1730419200": 4,
    "1730505600": 1,
    "1730592000": 4,
    "1730764800": 1,
    "1731369600": 17,
    "1731456000": 1,
    "1731542400": 2,
    "1731888000": 5,
    "1731974400": 10,
    "1732406400": 4,
    "1732579200": 1,
    "1732665600": 2,
    "1733529600": 3,
    "1733616000": 2,
    "1733788800": 9,
    "1733875200": 1,
    "1734134400": 1,
    "1734220800": 3,
    "1734307200": 1,
    "1734393600": 1,
    "1734480000": 11,
    "1734652800": 8,
    "1734739200": 2,
    "1734912000": 1,
    "1734998400": 7,
    "1735084800": 4,
    "1735171200": 1,
    "1735344000": 5,
    "1735516800": 10,
    "1735603200": 4,
    "1735689600": 5,
    "1735862400": 2,
    "1735948800": 6,
    "1736035200": 7,
    "1736208000": 3,
    "1736985600": 4,
    "1737158400": 11,
    "1737763200": 3,
    "1738368000": 7,
    "1738627200": 1,
    "1739577600": 3,
    "1740096000": 23,
    "1740182400": 6,
    "1740355200": 3,
    "1741046400": 6,
    "1741737600": 3,
    "1742428800": 4,
    "1742515200": 10,
    "1743033600": 2,
  };

  try {
    const response = await fetch(
      "https://leetcode-stats-api.herokuapp.com/yashs33244"
    );

    if (!response.ok) {
      console.warn("Failed to fetch LeetCode stats, using mock data");
      return {
        ...mockLeetCodeStats,
        submissionCalendar: JSON.stringify(submissionCalendarData),
      };
    }

    const data = await response.json();

    // Check if we received valid data with expected fields
    if (!data.totalSolved || !data.totalQuestions) {
      console.warn(
        "Invalid LeetCode API response, using mock data with real calendar"
      );
      return {
        ...mockLeetCodeStats,
        submissionCalendar: JSON.stringify(submissionCalendarData),
      };
    }

    // Use directly provided submission calendar or parse if it's a string
    let submissionCalendar = data.submissionCalendar;
    if (typeof submissionCalendar === "string") {
      // It's already a string, use as is
      submissionCalendar = data.submissionCalendar;
    } else if (submissionCalendar) {
      // It's an object, stringify it
      submissionCalendar = JSON.stringify(data.submissionCalendar);
    } else {
      // No submission calendar data, use our provided data
      submissionCalendar = JSON.stringify(submissionCalendarData);
    }

    return {
      ...data,
      submissionCalendar: submissionCalendar,
    } as LeetCodeStats;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return {
      ...mockLeetCodeStats,
      submissionCalendar: JSON.stringify(submissionCalendarData),
    };
  }
}

export default function LeetcodeStats() {
  // Fetch LeetCode Stats
  const {
    data: leetCodeStats = mockLeetCodeStats,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["leetcodeStats"],
    queryFn: fetchLeetCodeStats,
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });

  // Loading state
  if (isPending) {
    return (
      <section className="border border-amber rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  if (!leetCodeStats) {
    return null;
  }

  // Convert submission calendar to a format we can display
  // LeetCode stores timestamps in seconds since epoch
  const calendarEntries: LeetCodeCalendarEntry[] =
    leetCodeStats.submissionCalendar
      ? Object.entries(leetCodeStats.submissionCalendar)
          .map(([timestamp, count]) => ({
            date: new Date(parseInt(timestamp) * 1000).toISOString(),
            count: Number(count),
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(-70) // Last 70 days
      : [];

  // Get the max count for scaling the heatmap
  const maxCount =
    calendarEntries.length > 0
      ? Math.max(...calendarEntries.map((entry) => entry.count))
      : 0;

  return (
    <section className="border border-amber rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-orange">LeetCode Profile</h3>
          <Button
            variant="outline"
            asChild
            className="border-rose text-rose hover:bg-rose hover:text-white"
          >
            <Link
              href="https://leetcode.com/u/yashs33244/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Problem Solving</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={
                      (leetCodeStats.totalSolved /
                        leetCodeStats.totalQuestions) *
                      100
                    }
                    text={`${leetCodeStats.totalSolved}`}
                    styles={buildStyles({
                      pathColor: "#3a86ff",
                      textColor: "#3a86ff",
                      trailColor: "#e6e6e6",
                      textSize: "28px",
                    })}
                  />
                </div>
                <p className="text-gray-600 text-xs">Total</p>
                <p className="text-gray-800 text-xs">
                  {leetCodeStats.totalQuestions} problems
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={
                      (leetCodeStats.easySolved / leetCodeStats.totalEasy) * 100
                    }
                    text={`${leetCodeStats.easySolved}`}
                    styles={buildStyles({
                      pathColor: "#ffbe0b",
                      textColor: "#ffbe0b",
                      trailColor: "#e6e6e6",
                      textSize: "28px",
                    })}
                  />
                </div>
                <p className="text-gray-600 text-xs">Easy</p>
                <p className="text-gray-800 text-xs">
                  {leetCodeStats.totalEasy} problems
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={
                      (leetCodeStats.mediumSolved / leetCodeStats.totalMedium) *
                      100
                    }
                    text={`${leetCodeStats.mediumSolved}`}
                    styles={buildStyles({
                      pathColor: "#ff6b35",
                      textColor: "#ff6b35",
                      trailColor: "#e6e6e6",
                      textSize: "28px",
                    })}
                  />
                </div>
                <p className="text-gray-600 text-xs">Medium</p>
                <p className="text-gray-800 text-xs">
                  {leetCodeStats.totalMedium} problems
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={
                      (leetCodeStats.hardSolved / leetCodeStats.totalHard) * 100
                    }
                    text={`${leetCodeStats.hardSolved}`}
                    styles={buildStyles({
                      pathColor: "#f72585",
                      textColor: "#f72585",
                      trailColor: "#e6e6e6",
                      textSize: "28px",
                    })}
                  />
                </div>
                <p className="text-gray-600 text-xs">Hard</p>
                <p className="text-gray-800 text-xs">
                  {leetCodeStats.totalHard} problems
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Progress</span>
                  <span>
                    {Math.round(
                      (leetCodeStats.totalSolved /
                        leetCodeStats.totalQuestions) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-azure"
                    style={{
                      width: `${
                        (leetCodeStats.totalSolved /
                          leetCodeStats.totalQuestions) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Acceptance Rate</span>
                  <span>{leetCodeStats.acceptanceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-amber"
                    style={{ width: `${leetCodeStats.acceptanceRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">
              Ranking & Performance
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Global Ranking</p>
                <p className="text-2xl font-bold">
                  #{leetCodeStats.ranking.toLocaleString()}
                </p>
                <span className="text-xs px-2 py-1 bg-blueviolet text-white rounded-full">
                  Top {Math.ceil((leetCodeStats.ranking / 5000000) * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Solved Problems</p>
                  <p className="text-2xl font-bold text-orange">
                    {leetCodeStats.totalSolved}
                  </p>
                </div>
                {leetCodeStats.contributionPoints && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Contribution Points</p>
                    <p className="text-2xl font-bold text-azure">
                      {leetCodeStats.contributionPoints}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submission Calendar Heatmap */}
        {calendarEntries.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Submission Activity</h4>
            <div className="p-4 bg-gray-50 rounded-lg overflow-auto">
              <div className="flex flex-wrap gap-1">
                {calendarEntries.map((entry, index) => {
                  // Calculate intensity based on submission count
                  const intensity =
                    maxCount > 0
                      ? Math.min(Math.floor((entry.count / maxCount) * 5), 4)
                      : 0;

                  // Map intensity to color classes that match our color scheme
                  let bgColor;
                  switch (intensity) {
                    case 0:
                      bgColor =
                        entry.count === 0 ? "bg-gray-100" : "bg-azure-100";
                      break;
                    case 1:
                      bgColor = "bg-azure-200";
                      break;
                    case 2:
                      bgColor = "bg-azure-400";
                      break;
                    case 3:
                      bgColor = "bg-azure-600";
                      break;
                    case 4:
                      bgColor = "bg-azure-800";
                      break;
                    default:
                      bgColor = "bg-gray-100";
                  }

                  const date = new Date(entry.date);
                  const dateStr = date.toLocaleDateString();

                  return (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-sm ${bgColor} hover:ring-1 hover:ring-gray-400 transition-all`}
                      title={`${dateStr}: ${entry.count} submissions`}
                    >
                      {/* Tooltip could be added with a more advanced library if needed */}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-xs text-gray-500">
                  Submission activity in the last 70 days
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Less</span>
                  <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-azure-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-azure-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-azure-600 rounded-sm"></div>
                  <div className="w-3 h-3 bg-azure-800 rounded-sm"></div>
                  <span className="text-xs text-gray-500">More</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
