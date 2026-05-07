import { useState } from "react";
import Button from "../../../shared/ui/button";
import { HourglassOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useTask } from "../../Context/Task/TaskContext";
import { isExpired, newDate } from "../../Utils/Date";

const TaskDeadline = ({ taskId }: { taskId: string }) => {
  const [open, setOpen] = useState(false);

  const { currentDate, getTask } = useTask();

  const task = getTask(taskId);

  const expired = isExpired(task?.dueData, currentDate);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="button"
        className="task-item__btns-deadline p-0"
        onClick={handleClick}
      >
        <HourglassOutlined className="task-item__icon task-item__icon--deadline" />
      </Button>
      <Modal
        title="Выполнить задачу до..."
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        okText="Ок"
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
        onOk={() => {
          handleClick();
        }}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
      >
        {task?.dueData ? (
          <p className="card-history__info" key={task?.id}>
            {expired
              ? `Задача была просрочена нужно было выполнить до "
                ${newDate(task.dueData)}"`
              : `Необходимо выполнить задачу до "${newDate(task.dueData)}"`}
          </p>
        ) : (
          <p className="card-history" key={task?.id}>
            У этой задачи нет дедлайна
          </p>
        )}
      </Modal>
    </>
  );
};

export default TaskDeadline;
