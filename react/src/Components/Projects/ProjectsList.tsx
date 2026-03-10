import "./Project.scss";
import { useProjects } from "../Context/Context";
import CardComponent from "../Card/Card";
import ButtonCreate from "./ButtonCreate";

const ProjectsList = () => {
  const { projects } = useProjects();

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project">
          <div className="project-top rounded-3 p-2">
            <h1 className="project-title">Ваши проекты</h1>
            <ButtonCreate/>
          </div>
          <ul className="project-list">
            {projects.map((project) => (
              <li className="project-item" key={project.id}>
                <CardComponent key={project.id} project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
