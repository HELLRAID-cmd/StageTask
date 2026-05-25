import { useCallback, useEffect, useState } from "react";
import type { Columns } from "../../../shared/props/type";
import { API_MODE, INTERVAL_TIME } from "../../Utils/Settings";
import columnsApi from "../../../shared/api/columns";

const useColumnsContext = () => {
  const [errorAPI, setErrorAPI] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [activeColumnsId, setActiveColumnsId] = useState<string | null>(null);

  const getColumns = (id: string) => {
    return columns.find((t) => t.id === id);
  };

  // Функция создание колонки
  const createColumns = useCallback(async (data: Omit<Columns, "id">) => {
    const addedColumns = await columnsApi.add(data);
    setColumns((prev) => [...prev, addedColumns]);
  }, []);

  // Функция по удалению колонки
  const deleteColumn = useCallback(async (taskId: string) => {
    columnsApi.deleteColumn(taskId).then(() => {
      setColumns((prev) => prev.filter((task) => task.id !== taskId));
    });
  }, []);

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
