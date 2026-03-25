import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./Components/Projects/ProjectPage";
import ProjectsList from "./Components/Projects/ProjectsList";
import { useTasks } from "./Components/Context/ContextTask";
import TaskButton from "./Components/Task/TaskButtons/TaskButton";
import type { TaskHistory } from "./Components/Utils/type";
import MainScreen from "./Components/Main/MainScreen";
import ProjectCreate from "./Components/Projects/ProjectCreate";
import NotFound from "./Components/NotFound/NotFound";

const DndContextWrapper = () => {
  const {
    setActiveId,
    tasks,
    setTasks,
    activeId,
    setGrabTask,
    editTaskId,
  } = useTasks();

  const activeTask = tasks.find((t) => t.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
  );

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

        const newStatus = over.id as string;

        setTasks((prev) => {
          const updated = prev.map((t) => {
            if (t.id !== active.id) return t;

            const historyItem: TaskHistory = {
              id: crypto.randomUUID(),
              type: "moved",
              date: Date.now(),
              from: t.status,
              to: newStatus,
            };

            return {
              ...t,
              status: newStatus,
              history: [...t.history, historyItem],
            };
          });

          localStorage.setItem("tasks", JSON.stringify(updated));
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
            <TaskButton
              task={activeTask}
              editTaskId={editTaskId}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndContextWrapper;
