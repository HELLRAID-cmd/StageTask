import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useProjects } from "./Components/Context/Context";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./Components/Projects/ProjectPage";
import ProjectsList from "./Components/Projects/ProjectsList";
import Task from "./Components/Task/Task";
import { useTasks } from "./Components/Context/ContextTask";
import TaskButton from "./Components/Task/TaskButtons/TaskButton";
import type { TaskHistory } from "./Components/Utils/type";

const DndContextWrapper = () => {
  const {
    setActiveId,
    tasks,
    setTasks,
    activeId,
    setGrabTask,
    editTaskId,
    setEditTaskId,
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
        <Route path="/" element={<AppContent />} />
        {/* Страница отдельного проекта */}
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
      <DragOverlay>
        {activeTask ? (
          <div style={{ opacity: 0.9 }}>
            <TaskButton
              task={activeTask}
              editTaskId={editTaskId}
              setEditTaskId={setEditTaskId}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const AppContent = () => {
  const { projects } = useProjects();
  return projects.length > 0 ? <ProjectsList /> : <Task />;
};

export default DndContextWrapper;
