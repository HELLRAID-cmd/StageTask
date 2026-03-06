import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useProjects } from "./Components/Context/Context";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./Components/Projects/ProjectPage";
import ProjectsList from "./Components/Projects/ProjectsList";
import Task from "./Components/Task/Task";
import { useTasks } from "./Components/Context/ContextTask";
import TaskButton from "./Components/Task/TaskButton";

const DndContextWrapper = () => {
  const { setActiveId, tasks, setTasks, activeId, setGrabTask } = useTasks();

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        setGrabTask(true);
        console.log("asd");
      }}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over) return;

        const newStatus = over.id as string;
        console.log(over);

        setTasks((prev) => {
          const updated = prev.map((t) =>
            t.id === active.id ? { ...t, status: newStatus } : t,
          );

          localStorage.setItem("tasks", JSON.stringify(updated));

          return updated;
        });
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
              id={activeTask.id}
              title={activeTask.title}
              status={activeTask.status}
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
