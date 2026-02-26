import type { CardProps } from "../Utils/Type";
import { DeleteOutlined } from "@ant-design/icons";

const CardComponent: React.FC<CardProps> = ({ project }) => {
  
  return (
    <div
      className={`card ${project.id}`}
      style={{
        background: project.colorCode,
      }}
    >
      <p className="card-title">{project.title}</p>

      <p className="card-desc">{project.desc}</p>
      <div className="card-text">
        <p className="card-text__data">
          Создано: {new Date(project.createdAt).toLocaleDateString("ru-RU")}
        </p>
        <button type="button" className="card-title__btn">
          <DeleteOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
