import { IPrices } from "../components/Layout/interfaces";

export function formatPriceParts({ amount, currencyCode = "USD" }: IPrices): {
  symbol: string;
  value: string;
} {
  const parts = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).formatToParts(amount);

  const symbol = parts.find((p) => p.type === "currency")?.value ?? "";
  const value = parts
    .filter((p) => p.type !== "currency")
    .map((p) => p.value)
    .join("");

  return { symbol, value: value };
}

export const formatDateToLocalInput = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const formatDateToString = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric", // 2025
    month: "long", // July
    day: "numeric", // 25
    hour: "numeric", // 2
    minute: "2-digit", // 50
    hour12: true, // AM/PM
  });
};

export function formatFriendlyDate(
  dateString: string,
  options?: { showTime?: boolean }
) {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  if (options?.showTime === false) return datePart;

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${datePart} at ${timePart}`;
}

export const formatTimeTo12Hour = (time24: string) => {
  const [hours, minutes] = time24.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const toHHMM = (m: number) => {
  const h = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return `${h}:${mm}`;
};
