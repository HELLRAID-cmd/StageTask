import "./Project.scss";
import CardComponent from "../Cards/Card";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useProject } from "../Context/Project/ProjectContext";
import ButtonCreateProject from "./ButtonCreateProject";
import HeaderMain from "../Main/Header/HeaderMain";
import useBackground from "../../shared/hooks/useBackground";

const ProjectsList = () => {
  const { projects, isProjectsEmpty, errorAPI, loading } = useProject();

  let content;
  let btnCreate;

  useBackground();

  //* Если ошибка с сервером показать ошибку
  if (errorAPI) {
    content = (
      <h1 className="project-list__text text-danger heading-primary">
        Похоже неполадки с сервером, повторите попытку позже!
      </h1>
    );
    //* Если нет проекта(ов) показать кнопку с созданием
  } else if (isProjectsEmpty) {
    content = (
      <h1 className="project-list__text text-light heading-primary">
        Похоже у вас еще нет проекта, поскорее создайте его!
      </h1>
    );
  } else {
    content = (
      <ul className="project-list">
        {projects.map((project) => (
          <li className="project-item" key={project.id}>
            <CardComponent key={project.id} project={project} />
          </li>
        ))}
      </ul>
    );
  }

  if (errorAPI) {
    btnCreate = <span className="text-light"></span>;
  } else {
    btnCreate = <ButtonCreateProject />;
  }

  return (
    <section className="sect-project">
      <HeaderMain showProjectBtn={false} />
      <div className="container">
        <div className="project">
          <div className="project-top">
            <div className="project-top__info">
              <Link to={"/"}>
                <LeftCircleOutlined
                  style={{ fontSize: "40px", color: "#fff" }}
                />
              </Link>

              <h1 className="project-title">Мои проекты</h1>

              {loading ? (
                <span className="text-light">Загрузка...</span>
              ) : (
                btnCreate
              )}
            </div>
          </div>
          {loading ? (
            <h1 className="project-list__text text-dark heading-primary">
              Загрузка...
            </h1>
          ) : (
            content
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
