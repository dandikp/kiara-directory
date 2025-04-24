import moment from "moment";
import type { DateRange } from "react-day-picker";

export const formatDate = (dateString: Date | string) => {
  return moment(dateString).format("DD/MM/YYYY, HH:mm:ss");
};

export const availableKeyDateRanges = ["date"];
export const availableKeyDate = [
  "date_paid",
  "date_expired",
  "created_at",
  "deleted_at",
];

export const dateToQueryString = (date: Date): string => {
  // Ensure the date is valid before formatting
  if (!date || isNaN(date.getTime())) {
    console.warn("Invalid date provided:", date);
    return "";
  }
  console.log(date.toISOString());
  // Format the date to 'YYYY-MM-DD'
  return moment(date).format("YYYY-MM-DD");
};

// Convert a DateRange to a query parameter string (e.g., "YYYY-MM-DD,YYYY-MM-DD")
export const dateRangeToQueryString = (dateRange: DateRange): string => {
  // Ensure `from` and `to` are not undefined before accessing them
  const from = dateRange.from ? dateRange.from.toISOString().split("T")[0] : "";
  const to = dateRange.to ? dateRange.to.toISOString().split("T")[0] : "";
  return `${from},${to}`;
};

export const parseQueryStringToDate = (
  dateParam?: string,
): Date | undefined => {
  if (!dateParam) return undefined;

  const trimmedDateString = dateParam.trim();
  const parsedDate = new Date(trimmedDateString);

  // Ensure the parsed date is valid
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  } else {
    console.warn("Invalid date in query string:", dateParam);
    return undefined;
  }
};

// Parse query parameter string back to DateRange
export const parseQueryStringToDateRange = (
  dateParam?: string,
): DateRange | undefined => {
  if (!dateParam) return undefined;

  const [fromString, toString] = dateParam.split(",");
  const fromDate = new Date(fromString.trim());
  const toDate = new Date(toString.trim());

  // Ensure both parsed dates are valid
  if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
    return { from: fromDate, to: toDate };
  } else {
    console.warn("Invalid date range in query string:", dateParam);
    return undefined;
  }
};

export const parseQueryStringToDateForMySQL = (
  dateParam?: string,
): { date: string; nextDay: string } | null => {
  if (!dateParam) return null;

  // Trim the date string and create a moment object
  const date = moment(dateParam.trim());

  // Check if the date is valid
  if (date.isValid()) {
    // Add one day to the parsed date
    const nextDay = date.clone().add(1, "day"); // Clone to avoid mutating the original date

    return {
      date: date.format("YYYY-MM-DD"), // Original date
      nextDay: nextDay.format("YYYY-MM-DD"), // Next day
    };
  } else {
    console.warn("Invalid date in query string:", dateParam);
    return null;
  }
};

export const parseQueryStringToDateRangeForMySQL = (
  dateParam?: string,
): { from: string; to: string } | null => {
  if (!dateParam) return null;

  const [fromString, toString] = dateParam.split(",");
  const fromDate = moment(fromString.trim());
  const toDate = moment(toString.trim());

  // Check if both dates are valid
  if (fromDate.isValid() && toDate.isValid()) {
    return {
      from: fromDate.format("YYYY-MM-DD"),
      to: toDate.format("YYYY-MM-DD"),
    };
  } else {
    console.warn("Invalid date range in query string:", dateParam);
    return null;
  }
};

export const getDateRangeForMySQL = (): {
  from: string;
  to: string;
} => {
  const now = moment();

  const from = now
    .clone()
    .subtract(2, "days")
    .startOf("day")
    .format("YYYY-MM-DD");
  const to = now.clone().endOf("day").format("YYYY-MM-DD");

  return {
    from,
    to,
  };
};
