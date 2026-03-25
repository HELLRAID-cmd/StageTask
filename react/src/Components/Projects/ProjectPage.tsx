import { Link, Navigate, useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";
import ButtonCreateTask from "../Drag/ButtonCreateTask";
import TaskColumn from "../Task/Tasks/TaskColumn";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import makeScreenShot from "../Utils/MakeScreenShot";

// Открывает проект
const ProjectPage = () => {
  const { id } = useParams();
  const { projects, setProjects } = useProjects();
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
      <div className="container">
        <div ref={previewRef}>
          <div className="project-top justify-content-start gap-2 rounded-3 p-2">
            <Link to={"/myProject"}>
              <LeftCircleOutlined
                style={{ fontSize: "40px", color: "#fff" }}
                onClick={handleScreenshot}
              />
            </Link>
            <h1 className="project-title">{project.title}</h1>
          </div>
          <ul className="project-list project-list--task">
            <li
              className="project-item project-item--planned rounded-3 p-3"
              id={`planned-${project.id}`}
            >
              <div className="project-item__top">
                <p className="project-item__title title-planned mb-4">
                  Запланировано
                </p>
                <ButtonCreateTask projectId={project.id} />
              </div>
              <TaskColumn projectId={project.id} status="planned" />
            </li>
            <li
              className="project-item project-item--progress rounded-3 p-3"
              id={`progress-${project.id}`}
            >
              <p className="project-item__title title-progress mb-4">
                В процессе
              </p>
              <TaskColumn projectId={project.id} status="progress" />
            </li>
            <li
              className="project-item project-item--stopped rounded-3 p-3"
              id={`stopped-${project.id}`}
            >
              <p className="project-item__title title-stopped mb-4">
                Остановленно
              </p>
              <TaskColumn projectId={project.id} status="stopped" />
            </li>
            <li
              className="project-item project-item--completed size-xl rounded-3 p-3"
              id={`completed-${project.id}`}
            >
              <p className="project-item__title title-completed mb-4">
                Выполнено
              </p>
              <TaskColumn projectId={project.id} status="completed" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
