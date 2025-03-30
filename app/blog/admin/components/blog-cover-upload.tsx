"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { BlogCoverUploadProps } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogCoverUpload({ value, onChange }: BlogCoverUploadProps) {
  const [isHovering, setIsHovering] = useState(false);

  // For now, just handle URL input - could be extended to upload files
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Clear the image URL
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={value}
          onChange={handleUrlChange}
          className="flex-1"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear image</span>
          </Button>
        )}
      </div>

      {value ? (
        <div
          className="relative aspect-video overflow-hidden rounded-md border"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Image src={value} alt="Cover image" fill className="object-cover" />
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClear}
                className="text-white"
              >
                Remove Image
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-md border border-dashed bg-muted p-4">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <span>Enter an image URL above</span>
          </div>
        </div>
      )}
    </div>
  );
}
