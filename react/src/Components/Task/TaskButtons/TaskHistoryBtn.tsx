import { ClockCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { useTasks } from "../../Context/ContextTask";
import CardHistory from "../../Cards/CardHistory";

const TaskHistoryBtn = ({ taskId }: { taskId: string }) => {
  const [open, setOpen] = useState(false);
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === taskId);

  return (
    <>
      <button
        className="task-item__btns-info"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ClockCircleOutlined />
      </button>
      <Modal
        title="История задачи"
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        footer={null}
        className="task-modal"
        style={{ fontWeight: 500, marginBottom: 20 }}
        width={400}
        onCancel={() => setOpen(false)}
        closeIcon={
          <span style={{ color: "#000000", fontSize: "18px" }}>
            <CloseOutlined />
          </span>
        }
      >
        <ul className="task-history" style={{maxHeight: "400px", overflowY: "auto"}}>
          {task ? (
            <li className="task-history__item">
              <div className="task-history__page">
                <CardHistory task={task} />
              </div>
            </li>
          ) : (
            <p>Задача не найдена!</p>
          )}
        </ul>
      </Modal>
    </>
  );
};

export default TaskHistoryBtn;
