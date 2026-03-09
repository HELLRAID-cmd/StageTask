import { Link, useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";
import NotFound from "../NotFound/NotFound";
import ButtonCreateTask from "../Drag/ButtonCreateTask";
import TaskColumn from "../Task/Tasks/TaskColumn";
import { LeftCircleOutlined } from "@ant-design/icons";

// Открывает проект
const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);
  if (!project) return <NotFound />;

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project-top justify-content-start gap-2 bg-primary rounded-3 p-2">
          <Link to={"/"}>
            <LeftCircleOutlined style={{ fontSize: "34px", color: "#fff" }} />
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
    </section>
  );
};

export default ProjectPage;
