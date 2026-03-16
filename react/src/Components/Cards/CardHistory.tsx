import type { CardProps } from "../Utils/type";
import "./Card.scss";

const CardHistory: React.FC<CardProps> = ({ task }) => {
  if (!task || !task.history) return null;

  return (
    <div className={`card-history ${task?.id}`}>
      {[...task.history]
        .sort((a, b) => b.date - a.date)
        .map((item) => {
          if (item.type === "created") {
            return (
              <p className="card-history__info" key={item.id}>
                Создано: {new Date(task.createdAt).toLocaleString("ru-RU")}
              </p>
            );
          }

          if (item.type === "moved") {
            return (
              <p className="card-history__info" key={item.id}>
                Перемещено из "{item.from}" в "{item.to}" <br/>
                {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }

          if (item.type === "renamed") {
            return (
              <p className="card-history__info" key={item.id}>
                Название изменено "{item.oldTitle}" на "{item.newTitle}" <br/>
                {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }
        })}
    </div>
  );
};

export default CardHistory;
