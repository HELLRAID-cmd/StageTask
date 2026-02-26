import { useProjects } from "../Context/Context";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Project.scss";
import "./Card.scss";

const ProjectsList = () => {
  const { projects } = useProjects();

  return (
    <section className="sect-project">
      <div className="container">
        <div className="project">
          <div className="project-top">
            <h1 className="project-title">Ваши проекты</h1>
            <button
              className="project-top__create"
              aria-label="Создать проект"
              type="button"
            >
              <PlusCircleOutlined style={{ fontSize: "40px" }} />
            </button>
          </div>
          <ul className="project-list">
            {projects.map((project) => (
              <li className="project-item" key={project.id}>
                <Link
                  className="project-item__link"
                  to={`/project/${project.id}`}
                >
                  <div
                    className="card"
                    style={{
                      background: project.colorCode,
                    }}
                  >
                    <p className="card-title">{project.title}</p>

                    <p className="card-desc">{project.desc}</p>
                    <div className="card-text">
                      <p className="card-text__data">
                        Создано:{" "}
                        {new Date(project.createdAt).toLocaleDateString(
                          "ru-RU",
                        )}
                      </p>
                      <button type="button" className="card-title__btn">
                        <DeleteOutlined style={{ fontSize: "24px" }} />
                      </button>
                    </div>
                  </div>
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
