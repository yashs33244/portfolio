import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-transparent p-2 px-6 text-center font-medium",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 p-2">
        <div className="h-2 w-2 rounded-full bg-figma-gradient transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className=" inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className="bg-figma-gradient hover:text-black hover:rounded-full absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2  opacity-0 
      font-medium text-lg transition-all duration-300 group-hover:-translate-x-6 group-hover:opacity-100 hover:border-figma-gradient hover:bg-transparent"
      >
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
