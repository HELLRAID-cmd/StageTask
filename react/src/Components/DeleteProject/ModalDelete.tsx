import { Input, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { DeleteProps } from "../Utils/type";

const ModalDelete: React.FC<DeleteProps> = ({ open, onConfirm, onCancel, project }) => {
  const [valueDelete, setValueDelete] = useState("");

  return (
    <>
      <Modal
        title={`Удалить ${project.title}`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onOk={onConfirm}
        onCancel={onCancel}
        okText="Удалить"
        okButtonProps={{
          style: { width: "100%" },
          danger: true,
          disabled: valueDelete.trim() !== project.title,
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered
        style={{ textAlign: "center" }}
        closeIcon={
          <span
            style={{
              color: "#000000",
              fontSize: "18px",
              justifyContent: "center",
            }}
          >
            <CloseOutlined />
          </span>
        }
      >
        <p className="text-dark mb-2">
          Чтобы удалить введине название проекта "{project.title}"
        </p>
        <Input
          name="project"
          placeholder="Введите название"
          value={valueDelete}
          onChange={(e) => setValueDelete(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalDelete;
