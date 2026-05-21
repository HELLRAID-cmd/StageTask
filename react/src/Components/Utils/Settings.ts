// Task
export const MAX_TASK_TEXT = 40;
export const DATE_UTILS = {
  todayISO: () => new Date().toISOString().split("T")[0],
  now: () => Date.now(),
};

// Project
export const MAX_PROJECT_NAME = 30;
export const MAX_PROJECT_DESC = 60;

// API
export const INTERVAL_TIME = 5000;
export const API_MODE = false;
export const HEADERS = {
  "Content-Type": "application/json",
};

// API PROJECT
export const URL_PROJECT = "http://localhost:3001/project";

// API TASK
export const URL_TASK = "http://localhost:3001/task";

// API COLUMNS
export const URL_COLUMNS = "http://localhost:3001/columns";
