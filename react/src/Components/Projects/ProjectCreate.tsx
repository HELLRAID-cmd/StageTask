import { useProject } from "../Context/Project/ProjectContext";
import "../Task/Task.scss";
import ButtonCreateProject from "./ButtonCreateProject";

const ProjectCreate = () => {
  const { projects } = useProject();

  if (projects.length) return;

  return (
    <div className="project-create d-flex justify-content-center flex-column align-items-center">
      <h1 className="project-create__title heading-primary text-dark">
        У вас нет проекта
      </h1>
      <h2 className="project-create__subtitle heading-secondary text-dark">
        Создайте его
      </h2>
      <ButtonCreateProject />
    </div>
  );
};

export default ProjectCreate;
