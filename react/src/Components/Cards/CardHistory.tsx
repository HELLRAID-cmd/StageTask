import type { CardProps } from "../../shared/props/type";
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
                Создано: {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }

          if (item.type === "moved") {
            return (
              <p className="card-history__info" key={item.id}>
                Перемещено из "
                <span
                  className={`card-history__text-${item.from} card-history__text-uppercase`}
                >
                  {item.from}
                </span>
                " в "
                <span
                  className={`card-history__text-${item.to} card-history__text-uppercase`}
                >
                  {item.to}
                </span>
                " <br />
                {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }

          if (item.type === "renamed") {
            return (
              <p className="card-history__info" key={item.id}>
                Название изменено с "{item.oldTitle}" на "{item.newTitle}"{" "}
                <br />
                {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }

          if (item.type === "deadline") {
            return (
              <p className="card-history__info" key={item.id}>
                Срок задачи изменен на "{item.dueData}" <br />
                {new Date(item.date).toLocaleString("ru-RU")}
              </p>
            );
          }
        })}
    </div>
  );
};

export default CardHistory;
