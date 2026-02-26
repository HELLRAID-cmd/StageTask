import "./Project.scss";
import "../Card/Card.scss"
import { useProjects } from "../Context/Context";
import { Link } from "react-router-dom";
import ProjectCreate from "./ProjectCreate";
import CardComponent from "../Card/Card";

const ProjectsList = () => {
  const { projects } = useProjects();

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project">
          <div className="project-top">
            <h1 className="project-title">Ваши проекты</h1>
            <ProjectCreate/>
          </div>
          <ul className="project-list">
            {projects.map((project) => (
              <li className="project-item" key={project.id}>
                <Link
                  className="project-item__link"
                  to={`/project/${project.id}`}
                >
                  <CardComponent key={project.id} project={project}/>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
