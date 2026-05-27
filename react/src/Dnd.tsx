import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./Components/Projects/ProjectPage";
import ProjectsList from "./Components/Projects/ProjectsList";
import TaskButton from "./Components/Task/TaskButtons/TaskButton";
import MainScreen from "./Components/Main/MainScreen";
import ProjectCreate from "./Components/Projects/ProjectCreate";
import NotFound from "./Components/NotFound/NotFound";
import { useEffect, useState } from "react";
import { useTask } from "./Components/Context/Task/TaskContext";
import { useColumns } from "./Components/Context/Columns/ColumnsContext";

const DndContextWrapper = () => {
  const {
    setActiveId,
    tasks,
    setTasks,
    activeId,
    setGrabTask,
    editTaskId,
    saveHistoryTask,
  } = useTask();

  const { columns } = useColumns();

  const activeTask = tasks.find((t) => t.id === activeId);

  // функция считывания размера экрана
  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(
      window.matchMedia("(max-width: 768px)").matches,
    );

    useEffect(() => {
      const media = window.matchMedia("(max-width: 768px)");

      const listener = () => setIsMobile(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, []);

    return isMobile;
  };

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 0,
      tolerance: 5,
    },
  });

  const pointerSensor = useSensor(PointerSensor);

  const isMobile = useIsMobile();

  // Менять сенсор в зависимости от разрешение экрана
  const sensors = useSensors(isMobile ? touchSensor : pointerSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        setGrabTask(true);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over) return;

        const newColumnId = over.id as string;

        const task = tasks.find((t) => t.id === active.id);

        if (!task) return;

        const fromColumn = columns.find((c) => c.id === task?.columnId);
        const toColumn = columns.find((c) => c.id === newColumnId);

        if (!fromColumn || !toColumn) return;

        saveHistoryTask(task.id, {
          type: "moved",
          date: Date.now(),
          from: fromColumn.title,
          to: toColumn.title,
        });

        setTasks((prev) => {
          const updated = prev.map((t) => {
            if (t.id !== active.id) return t;

            return {
              ...t,
              columnId: newColumnId,
              history: [...t.history],
            };
          });

          return updated;
        });
        setGrabTask(false);
      }}
      onDragCancel={() => {
        setActiveId(null);
      }}
    >
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<MainScreen />} />
        {/* Страница отдельного проекта */}
        <Route path="/project/:id" element={<ProjectPage />} />
        {/* Страница создание проекта */}
        <Route path="/create" element={<ProjectCreate />} />
        {/* Страница моих проектов */}
        <Route path="/myProject" element={<ProjectsList />} />
        {/* Страница не найдена */}
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
      <DragOverlay>
        {activeTask ? (
          <div style={{ opacity: 0.9 }}>
            <TaskButton task={activeTask} editTaskId={editTaskId} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndContextWrapper;
