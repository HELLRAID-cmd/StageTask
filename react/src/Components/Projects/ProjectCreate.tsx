import { useProjects } from "../Context/Context";
import "../Task/Task.scss";
import ButtonCreate from "./ButtonCreate";

const ProjectCreate = () => {
  const { projects } = useProjects();

  if (projects.length) return;

  return (
    <div className="project-create d-flex justify-content-center flex-column align-items-center">
      <h1 className="project-create__title fw-medium text-light">
        У вас нет проекта
      </h1>
      <h2 className="project-create__subtitle fw-medium text-light">
        Создайте его
      </h2>
      <ButtonCreate />
    </div>
  );
};

export default ProjectCreate;
