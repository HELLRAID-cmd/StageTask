export const newDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("ru-RU");
};

export const newDateWithTime = (date: string | Date) => {
  return new Date(date).toLocaleString("ru-RU");
};

export const isExpired = (date?: string | Date, currentDate?: string | Date) => {
  if (!date || !currentDate) return false;

  return new Date(date) < new Date(currentDate);
};
