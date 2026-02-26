import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global/_reset.scss";
import "../styles/global/_antd.scss";
import "../styles/global/_container.scss";
import { ProjectProvider, useProjects } from "./Components/Context/Context";
import Task from "./Components/Task/Task";
import ProjectsList from "./Components/Projects/ProjectsList";
import ProjectPage from "./Components/Projects/ProjectPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<AppContent />} />
          {/* Страница отдельного проекта */}
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

const AppContent = () => {
  const { projects } = useProjects();
  return projects.length > 0 ? <ProjectsList /> : <Task />;
};

export default App;