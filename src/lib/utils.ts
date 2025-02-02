import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInternalUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export function formatExternalUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_GO_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export function formatRelativeTime(dateTime: string) {
  const now = new Date();
  const inputTime = new Date(dateTime);

  // If the input is not a valid date, return the input as is
  if (isNaN(inputTime.getTime())) {
    return dateTime;
  }

  const diffInMs = now.getTime() - inputTime.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  // Beyond 7 days, return the actual date-time string
  return inputTime.toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

// Utility function to format date range
export const formatDateRange = (
  startDate: string,
  endDate?: string
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : "";

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      year: "2-digit",
      month: "short",
      timeZone: "UTC",
    });
  };

  if (end === "" || start.getDate() === end.getDate()) {
    return formatDate(start);
  }

  return `${formatDate(start)} - ${formatDate(end)}`;
};

export const formatTimeRange = (
  startTime: string,
  endTime?: string
): string => {
  const formatTime = (isoTime: string): string => {
    const date = new Date(isoTime);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });
  };

  return endTime
    ? `${formatTime(startTime)} - ${formatTime(endTime)}`
    : formatTime(startTime);
};

// convert clock time (e.g., "17:00:00") to ISO string ("0001-01-01T17:00:00.000Z")
export function convertTimeToISOString(clockTimeAt: string) {
  if (!clockTimeAt) return "";
  // Get the current date (today) and append the time
  const currentDate = new Date();
  const [hours, minutes] = clockTimeAt.split(":");

  // Set the current date's hours and minutes
  currentDate.setHours(Number(hours), Number(minutes), 0, 0);

  // Return the ISO string (in UTC format)
  return currentDate.toISOString();
}

// convert a date (e.g., "Mon Feb 03 2025 00:00:00 GMT+0700 (Indochina Time)") to ISO string ("2025-02-02T17:00:00.000Z")
// THIS FUNCTION WILL TURN ANY TIME ZONE TO UTC
export function convertDateToISOString(dateAt: string) {
  if (!dateAt) return "";
  const DateTime = new Date(dateAt);
  return DateTime.toISOString();
}

export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  });
};

export const formatGroupNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    useGrouping: true,
  });
};

export const alphabeticLength = (value: string) => {
  // Remove HTML tags
  const textWithoutHtml = value.replace(/<[^>]*>/g, "");
  // Remove non-alphabetic characters (including spaces)
  return textWithoutHtml.replace(/[^a-zA-Z]/g, "").length;
};

// 2024-11-16 00:00:00+00 for database
// 2024-11-16T00:00:00.000Z for api call
