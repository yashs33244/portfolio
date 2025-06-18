"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, Trophy, Zap, Flame, Code } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useQuery } from "@tanstack/react-query";
import { leetcodeAPI } from "@/lib/platform-api";
import { Skeleton } from "@/components/ui/skeleton";

// Progress Circle Component
function ProgressCircle({
  percentage,
  color,
  label,
  count,
}: {
  percentage: number;
  color: string;
  label: string;
  count: number;
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-2">
        <CircularProgressbar
          value={percentage}
          text={`${count}`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#ffffff",
            trailColor: "rgba(255,255,255,0.1)",
            textSize: "24px",
          })}
        />
      </div>
      <p className="text-sm text-white/70">{label}</p>
    </div>
  );
}

// Difficulty Bar Component
function DifficultyBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{label}</span>
        <span className="text-white/70 text-sm">{count}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

// Submission Calendar Component
function SubmissionCalendar({
  calendarData,
}: {
  calendarData: { [date: string]: number };
}) {
  // Convert the calendar data to the format expected by react-calendar-heatmap
  const values = Object.entries(calendarData).map(([timestamp, count]) => ({
    date: new Date(parseInt(timestamp) * 1000),
    count: count,
  }));

  // Get date range for the heatmap (last year)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const getTitleForValue = (value: any) => {
    if (!value || !value.date) {
      return "";
    }
    const submissions = value.count || 0;
    return `${value.date.toDateString()}: ${submissions} submission${
      submissions !== 1 ? "s" : ""
    }`;
  };

  const getClassForValue = (value: any) => {
    if (!value || value.count === 0) {
      return "color-empty";
    }
    if (value.count < 3) {
      return "color-scale-1";
    }
    if (value.count < 6) {
      return "color-scale-2";
    }
    if (value.count < 10) {
      return "color-scale-3";
    }
    return "color-scale-4";
  };

  return (
    <div className="bg-figma-dark rounded-lg p-4">
      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <CalendarDays className="w-5 h-5 text-figma-purple" />
        Submission Activity
      </h4>
      <div className="submission-heatmap">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={getClassForValue}
          titleForValue={getTitleForValue}
        />
      </div>
      <style jsx>{`
        .submission-heatmap :global(.react-calendar-heatmap) {
          font-size: 10px;
        }
        .submission-heatmap :global(.react-calendar-heatmap .color-empty) {
          fill: rgba(255, 255, 255, 0.1);
        }
        .submission-heatmap :global(.react-calendar-heatmap .color-scale-1) {
          fill: #7a87fb;
          opacity: 0.3;
        }
        .submission-heatmap :global(.react-calendar-heatmap .color-scale-2) {
          fill: #7a87fb;
          opacity: 0.5;
        }
        .submission-heatmap :global(.react-calendar-heatmap .color-scale-3) {
          fill: #7a87fb;
          opacity: 0.7;
        }
        .submission-heatmap :global(.react-calendar-heatmap .color-scale-4) {
          fill: #7a87fb;
          opacity: 1;
        }
        .submission-heatmap :global(.react-calendar-heatmap text) {
          fill: rgba(255, 255, 255, 0.6);
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}

export default function LeetcodeStats() {
  const { data: leetcodeUser, isLoading: userLoading } = useQuery({
    queryKey: ["leetcode-user"],
    queryFn: () => leetcodeAPI.getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: submissionCalendar, isLoading: calendarLoading } = useQuery({
    queryKey: ["leetcode-calendar"],
    queryFn: () => leetcodeAPI.getSubmissionCalendar(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (userLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-white/10" />
          ))}
        </div>
        <Skeleton className="h-64 bg-white/10" />
      </div>
    );
  }

  if (!leetcodeUser) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-8 h-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          LeetCode Data Unavailable
        </h3>
        <p className="text-white/60">
          Unable to fetch LeetCode statistics. Please check the connection or
          try again later.
        </p>
      </div>
    );
  }

  // Calculate difficulty breakdown
  const easyCount =
    leetcodeUser.acSubmissionNum.find((stat) => stat.difficulty === "Easy")
      ?.count || 0;
  const mediumCount =
    leetcodeUser.acSubmissionNum.find((stat) => stat.difficulty === "Medium")
      ?.count || 0;
  const hardCount =
    leetcodeUser.acSubmissionNum.find((stat) => stat.difficulty === "Hard")
      ?.count || 0;

  // Calculate percentages for progress circles
  const totalProblems = 3000; // Approximate total LeetCode problems
  const easyTotal = 1500;
  const mediumTotal = 1200;
  const hardTotal = 600;

  const easyPercentage = (easyCount / easyTotal) * 100;
  const mediumPercentage = (mediumCount / mediumTotal) * 100;
  const hardPercentage = (hardCount / hardTotal) * 100;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-orange-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {leetcodeUser.totalSolved}
          </div>
          <div className="text-white/70 text-sm">Problems Solved</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-green-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {leetcodeUser.ranking
              ? `#${leetcodeUser.ranking.toLocaleString()}`
              : "N/A"}
          </div>
          <div className="text-white/70 text-sm">Global Ranking</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-blue-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {(
              (leetcodeUser.acceptedCount / leetcodeUser.submissionCount) *
              100
            ).toFixed(1)}
            %
          </div>
          <div className="text-white/70 text-sm">Acceptance Rate</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-red-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {leetcodeUser.streak}
          </div>
          <div className="text-white/70 text-sm">Day Streak</div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Difficulty Breakdown */}
        <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-figma-purple" />
            Problem Difficulty Progress
          </h4>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <ProgressCircle
              percentage={easyPercentage}
              color="#10B981"
              label="Easy"
              count={easyCount}
            />
            <ProgressCircle
              percentage={mediumPercentage}
              color="#F59E0B"
              label="Medium"
              count={mediumCount}
            />
            <ProgressCircle
              percentage={hardPercentage}
              color="#EF4444"
              label="Hard"
              count={hardCount}
            />
          </div>

          <div className="space-y-4">
            <DifficultyBar
              label="Easy Problems"
              count={easyCount}
              total={easyTotal}
              color="#10B981"
            />
            <DifficultyBar
              label="Medium Problems"
              count={mediumCount}
              total={mediumTotal}
              color="#F59E0B"
            />
            <DifficultyBar
              label="Hard Problems"
              count={hardCount}
              total={hardTotal}
              color="#EF4444"
            />
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-figma-purple" />
            Performance Metrics
          </h4>

          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
              <span className="text-white font-medium">Total Submissions</span>
              <Badge
                variant="secondary"
                className="bg-figma-purple/20 text-figma-purple"
              >
                {leetcodeUser.submissionCount.toLocaleString()}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
              <span className="text-white font-medium">Accepted Solutions</span>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
                {leetcodeUser.acceptedCount.toLocaleString()}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
              <span className="text-white font-medium">Success Rate</span>
              <Badge
                variant="secondary"
                className="bg-blue-500/20 text-blue-400"
              >
                {(
                  (leetcodeUser.acceptedCount / leetcodeUser.submissionCount) *
                  100
                ).toFixed(1)}
                %
              </Badge>
            </div>

            <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
              <span className="text-white font-medium">Current Streak</span>
              <Badge
                variant="secondary"
                className="bg-orange-500/20 text-orange-400"
              >
                {leetcodeUser.streak} days
              </Badge>
            </div>

            {leetcodeUser.realName && (
              <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                <span className="text-white font-medium">Real Name</span>
                <span className="text-white/70">{leetcodeUser.realName}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Calendar */}
      {!calendarLoading &&
        submissionCalendar &&
        Object.keys(submissionCalendar).length > 0 && (
          <SubmissionCalendar calendarData={submissionCalendar} />
        )}

      {/* Loading state for calendar */}
      {calendarLoading && (
        <div className="bg-figma-dark rounded-lg p-4">
          <Skeleton className="h-6 w-48 mb-4 bg-white/10" />
          <Skeleton className="h-32 w-full bg-white/10" />
        </div>
      )}

      {/* No calendar data */}
      {!calendarLoading &&
        (!submissionCalendar ||
          Object.keys(submissionCalendar).length === 0) && (
          <div className="bg-figma-dark rounded-lg p-6 text-center">
            <CalendarDays className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">
              Submission calendar data is not available
            </p>
          </div>
        )}
    </div>
  );
}
