import "./Project.scss";
import { useProjects } from "../Context/Context";
import CardComponent from "../Cards/Card";
import ButtonCreate from "./ButtonCreate";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  const { projects, isProjectsEmpty } = useProjects();

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project">
          <div className="project-top rounded-3 p-2">
            <div className="project-top__left">
              <Link to={"/"}>
                <LeftCircleOutlined
                  style={{ fontSize: "40px", color: "#fff" }}
                />
              </Link>
              <h1 className="project-title">Ваши проекты</h1>
            </div>
            <div className="project-top__right">
              <ButtonCreate />
            </div>
          </div>
          {isProjectsEmpty ? (
            <h1 className="project-list__text text-dark heading-primary">
              Похоже у вас еще нет проекта, поскорее создайте его!
            </h1>
          ) : (
            <>
              <ul className="project-list">
                {projects.map((project) => (
                  <li className="project-item" key={project.id}>
                    <CardComponent key={project.id} project={project} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
