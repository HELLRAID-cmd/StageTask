import ModalWindow from "../Modal/Modal";
import "./Task.scss";

const Task = () => {
  return (
    <div className="task form-wrapper d-flex justify-content-center flex-column align-items-center">
      <h1 className="task-title fw-medium text-light">У вас нет проекта</h1>
      <h2 className="task-subtitle fw-medium text-light">Создайте его</h2>
      <ModalWindow />
    </div>
  );
};

export default Task;
