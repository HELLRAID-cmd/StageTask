export const newDate = (date: any) => {
  return new Date(date).toLocaleDateString("ru-RU");
};

export const newDateWithTime = (date: any) => {
  return new Date(date).toLocaleString("ru-RU");
};
