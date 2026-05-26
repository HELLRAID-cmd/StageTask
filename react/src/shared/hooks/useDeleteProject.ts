import { useColumns } from "../../Components/Context/Columns/ColumnsContext";
import { useProject } from "../../Components/Context/Project/ProjectContext";
import { useTask } from "../../Components/Context/Task/TaskContext";
import columnsApi from "../api/columns";
import projectsApi from "../api/project";
import tasksApi from "../api/task";

// Хук удаление проекта и все что в нем есть
export const useDeleteProject = () => {
  const { tasks } = useTask();
  const { columns } = useColumns();
  const { setProjects } = useProject();

  return async (projectId: string) => {
    // Найти все колонки проекта
    const columnsIds = columns
      .filter((c) => c.projectId === projectId)
      .map((c) => c.id);

    const columnsToDelete = columns.filter((c) => c.projectId === projectId);

    // Найти все задачи колонки
    const tasksToDelete = tasks.filter((t) => columnsIds.includes(t.columnId));

    // Удалить задачи
    await Promise.all(tasksToDelete.map((t) => tasksApi.deleteTask(t.id)));

    // Удалить колонки
    await Promise.all(
      columnsToDelete.map((c) => columnsApi.deleteColumn(c.id)),
    );

    // Удалить проект
    await projectsApi.delete(projectId);

    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };
};
