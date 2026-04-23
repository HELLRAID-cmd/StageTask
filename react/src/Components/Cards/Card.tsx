import { Link } from "react-router-dom";
import DeleteProject from "../Projects/DeleteProject/DeleteProject";
import type { CardProps } from "../../shared/props/type";
import "./Card.scss";
import { useProject } from "../Context/Project/ProjectContext";

const CardComponent: React.FC<CardProps> = ({ project }) => {
  const { setActiveProjectId } = useProject();

  if (!project) return null;

  // Эта часть нужно для сохранения превью в LocalStorage
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");
  const projectPreview = projects.find((p: any) => p.id === project.id);
  const preview = projectPreview?.preview;

  return (
    <div
      className={`card ${project.id}`}
      style={
        {
          background: project.colorCode,
          "--hover-shadow": `0 0 15px 5px ${project.colorCodeDark}`,
        } as React.CSSProperties
      }
    >
      <Link
        className="card-item"
        to={`/project/${project.id}`}
        onClick={() => setActiveProjectId(project.id)}
      >
        {!preview ? (
          <span
            className="card-item__span w-100 text-center rounded-2"
            style={{ background: project.colorCodeDark }}
          >
            Нет фото
          </span>
        ) : (
          <img
            className="card-item__img rounded-2"
            src={preview}
            alt="Фото проекта"
          />
        )}
        <div className="card-item__text">
          <p className="card-item__title">{project.title}</p>
          <p className="card-item__desc">{project.desc}</p>
        </div>
      </Link>
      <div
        className="card-bottom"
        style={{ background: project.colorCodeDark }}
      >
        <p className="card-bottom__data">
          Создано: {new Date(project.createdAt).toLocaleDateString("ru-RU")}
        </p>
        <div className="card-bottom__delete">
          <DeleteProject project={project} />
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
