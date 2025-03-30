"use client";

import { useState } from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  badgeClassName?: string;
  allowCreate?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items",
  className,
  badgeClassName,
  allowCreate = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Create a new option from input
  const createOption = () => {
    if (!inputValue || selected.includes(inputValue)) return;

    // Add new value to selected
    onChange([...selected, inputValue]);
    setInputValue("");
  };

  // Generate the display value for the button
  const displayValue =
    selected.length > 0
      ? selected.length === 1
        ? options.find((opt) => opt.value === selected[0])?.label || selected[0]
        : `${selected.length} selected`
      : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between px-3 min-h-10", className)}
        >
          <span className="truncate">{displayValue}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search options..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty>
            {allowCreate ? (
              <div className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={createOption}
                >
                  Create "{inputValue}"
                </Button>
              </div>
            ) : (
              <p className="p-2 text-sm text-center">No results found.</p>
            )}
          </CommandEmpty>
          <CommandGroup className="max-h-52 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(
                      isSelected
                        ? selected.filter((value) => value !== option.value)
                        : [...selected, option.value]
                    );
                  }}
                >
                  <div
                    className={cn(
                      "mr-2",
                      isSelected ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                  {option.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map((value) => {
            const label =
              options.find((opt) => opt.value === value)?.label || value;
            return (
              <Badge
                key={value}
                variant="secondary"
                className={cn("px-2 py-1", badgeClassName)}
              >
                {label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.preventDefault();
                    onChange(selected.filter((v) => v !== value));
                  }}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {label}</span>
                </button>
              </Badge>
            );
          })}
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => onChange([])}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </Popover>
  );
}
