import { Link } from "react-router-dom";
import DeleteProject from "../DeleteProject/DeleteProject";
import type { CardProps } from "../Utils/type";
import "./Card.scss";

const CardComponent: React.FC<CardProps> = ({ project }) => {
  return (
    <div
      className={`card ${project.id}`}
      style={{
        background: project.colorCode,
      }}
    >
      <Link className="card-item" to={`/project/${project.id}`}>
        <p className="card-title">{project.title}</p>
        <p className="card-desc">{project.desc}</p>
        <p className="card-data">
          Создано: {new Date(project.createdAt).toLocaleDateString("ru-RU")}
        </p>
      </Link>
      <div className="card-delete">
        <DeleteProject id={project.id} />
      </div>
    </div>
  );
};

export default CardComponent;
