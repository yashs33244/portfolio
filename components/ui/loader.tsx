"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loader({ size = "md", text, fullScreen = false }: LoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const LoaderContent = () => (
    <div
      className={`flex flex-col items-center gap-4 ${
        mounted ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {/* Animated dots */}
      <div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
      >
        <div className="absolute inset-0 animate-spin">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`${dotSizeClasses[size]} bg-figma-gradient rounded-full animate-pulse`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Central glow */}
        <div className="absolute inset-2 bg-figma-gradient rounded-full opacity-30 animate-pulse" />
      </div>

      {/* Loading text */}
      {text && (
        <p
          className={`text-white/80 font-poppins ${textSizeClasses[size]} animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-figma-dark/90 backdrop-blur-sm flex items-center justify-center z-50">
        <LoaderContent />
      </div>
    );
  }

  return <LoaderContent />;
}

export function SkeletonCard() {
  return (
    <div className="bg-figma-menu border border-white/10 rounded-lg p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
        <div className="h-20 bg-white/10 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/10 rounded-full w-16"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
          <div className="h-6 bg-white/10 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeletonCard() {
  return (
    <div className="bg-figma-menu border border-white/10 rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10"></div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="h-6 bg-white/10 rounded w-2/3"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-white/10 rounded"></div>
            <div className="w-8 h-8 bg-white/10 rounded"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-white/10 rounded-full w-16"></div>
          <div className="h-6 bg-white/10 rounded-full w-20"></div>
          <div className="h-6 bg-white/10 rounded-full w-14"></div>
        </div>
      </div>
    </div>
  );
}
