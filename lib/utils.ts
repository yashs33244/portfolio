import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string or Date object into a human-readable format
 * @param date Date string or Date object
 * @param formatStr Format string for date-fns
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  formatStr: string = "MMMM d, yyyy"
): string {
  return format(new Date(date), formatStr)
}

/**
 * Create a slug from a string by replacing spaces with hyphens and removing special characters
 * @param input String to slugify
 * @returns Slugified string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
