export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDuration = (weeks) => {
  if (!weeks && weeks !== 0) return "—";
  return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
};

export const initialsFromUsername = (name) => {
  if (!name) return "?";
  return name.slice(0, 2).toUpperCase();
};

export const truncate = (text, max = 120) => {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
};
