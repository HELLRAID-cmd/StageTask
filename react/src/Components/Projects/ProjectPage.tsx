import { useParams } from "react-router-dom";
import { useProjects } from "../Context/Context";
import NotFound from "../NotFound/NotFound";
import ButtonCreateTask from "../Drag/ButtonCreateTask";
import TaskProgress from "../Task/TaskProgress";

// Открывает проект
const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProjects();

  const project = projects.find((p) => p.id === id);
  if (!project) return <NotFound />;

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project-top bg-primary rounded-3 p-2">
          <h1 className="project-title">{project.title}</h1>
        </div>
        <ul className="project-list">
          <li className="project-item project-item--planned rounded-3 p-3">
            <div className="project-item__top">
              <p className="project-item__title title-planned mb-4">
                Запланировано
              </p>
              <ButtonCreateTask />
            </div>
            <TaskProgress />
          </li>
          <li className="project-item project-item--progress rounded-3 p-3">
            <p className="project-item__title title-progress mb-4">
              В процессе
            </p>
          </li>
          <li className="project-item project-item--stopped rounded-3 p-3">
            <p className="project-item__title title-stopped mb-4">
              Остановленно
            </p>
          </li>
          <li className="project-item project-item--completed size-xl rounded-3 p-3">
            <p className="project-item__title title-completed mb-4">
              Выполнено
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProjectPage;
