import { Link, Navigate, useParams } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import makeScreenShot from "../Utils/MakeScreenShot";
import { useProject } from "../Context/Project/ProjectContext";
import HeaderMain from "../Main/Header/HeaderMain";
import CreateColumnBtn from "../Columns/CreateColumnBtn";
import TaskColumns from "../Columns/Column";
import "../Columns/Columns.scss";

// Открывает проект
const ProjectPage = () => {
  const { id } = useParams();
  const { projects, setProjects } = useProject();
  const previewRef = useRef<HTMLDivElement | null>(null);

  const project = projects.find((p) => p.id === id);

  // Если нет проекта открывается страница notFound
  if (!project) {
    return <Navigate to="/notFound" />;
  }

  // Функция по сохранению фото проекта и записью в LC
  const handleScreenshot = async () => {
    const img = await makeScreenShot(previewRef.current);
    if (!img) return null;

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === project.id ? { ...p, preview: img } : p,
      );

      localStorage.setItem("projects", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="sect-project">
      <HeaderMain />
      <div className="container">
        <div ref={previewRef}>
          <div className="project-top">
            <div className="project-top__info project-top__info--page">
              <Link to={"/myProject"}>
                <LeftCircleOutlined
                  style={{ fontSize: "40px", color: "#fff" }}
                  onClick={handleScreenshot}
                />
              </Link>
              <h1 className="project-title">{project.title}</h1>
              <CreateColumnBtn projectId={project.id} />
            </div>
          </div>
          <ul className="columns columns--task">
            <TaskColumns projectId={project.id} />
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
