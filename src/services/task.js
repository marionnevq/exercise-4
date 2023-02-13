import http from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}

export function deleteTask(id) {
  return http.delete(`/tasks/${id}`);
}
