import { useCallback, useEffect, useState } from "react";
import type { Columns } from "../../../shared/props/type";
import { API_MODE, INTERVAL_TIME } from "../../Utils/Settings";
import columnsApi from "../../../shared/api/columns";
import { useTask } from "../Task/TaskContext";
import tasksApi from "../../../shared/api/task";

const useColumnsContext = () => {
  const [errorAPI, setErrorAPI] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [activeColumnsId, setActiveColumnsId] = useState<string | null>(null);

  const { tasks } = useTask();

  const getColumns = (id: string) => {
    return columns.find((t) => t.id === id);
  };

  // Функция создание колонки
  const createColumns = useCallback(async (data: Omit<Columns, "id">) => {
    const addedColumns = await columnsApi.add(data);
    setColumns((prev) => [...prev, addedColumns]);
  }, []);

  // Функция по удалению колонки
  const deleteColumn = useCallback(
    async (columnId: string) => {
      await columnsApi.deleteColumn(columnId);

      const tasksToDelete = tasks.filter((t) => t.columnId === columnId);
      await Promise.all(tasksToDelete.map((t) => tasksApi.deleteTask(t.id)));

      setColumns((prev) => prev.filter((col) => col.id !== columnId));
    },
    [tasks],
  );

  useEffect(() => {
    const checkServer = async () => {
      try {
        const data = await columnsApi.getColumns();
        setColumns(data);
        setErrorAPI(null);
      } catch {
        setErrorAPI("Ошибка сервера");
      } finally {
        setLoading(false);
      }
    };

    checkServer();

    if (API_MODE) {
      const interval = setInterval(checkServer, INTERVAL_TIME);

      return () => clearInterval(interval);
    }
  }, []);

  const isColumnsEmpty = !columns.length;

  return {
    isColumnsEmpty,
    getColumns,
    columns,
    setColumns,
    createColumns,
    activeColumnsId,
    setActiveColumnsId,
    loading,
    setLoading,
    errorAPI,
    setErrorAPI,
    deleteColumn,
  };
};

export default useColumnsContext;
