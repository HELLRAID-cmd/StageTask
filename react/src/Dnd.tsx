import { DndContext } from "@dnd-kit/core";
import { useProjects } from "./Components/Context/Context";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./Components/Projects/ProjectPage";
import ProjectsList from "./Components/Projects/ProjectsList";
import Task from "./Components/Task/Task";
import { useTasks } from "./Components/Context/ContextTask";

const DndContextWrapper = () => {
  const { setActiveId } = useTasks();

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={() => {
        setActiveId(null);
      }}
      onDragCancel={() => {
        setActiveId(null);
      }}
    >
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<AppContent />} />
        {/* Страница отдельного проекта */}
        <Route
          path="/project/:id"
          element={<ProjectPage />}
        />
      </Routes>
    </DndContext>
  );
};

const AppContent = () => {
  const { projects } = useProjects();
  return projects.length > 0 ? <ProjectsList /> : <Task />;
};

export default DndContextWrapper;
