import { Link } from "react-router-dom";
import DeleteProject from "../DeleteProject/DeleteProject";
import type { CardProps } from "../Utils/type";
import "./Card.scss";

const CardComponent: React.FC<CardProps> = ({ project }) => {
  if (!project) return null;

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
      <Link className="card-item" to={`/project/${project.id}`}>
        {!project.preview ? (
          <span
            className="card-item__span w-100 text-center rounded-2"
            style={{ background: project.colorCodeDark }}
          >
            Нет фото
          </span>
        ) : (
          <img
            className="card-item__img rounded-2"
            src={project.preview}
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
