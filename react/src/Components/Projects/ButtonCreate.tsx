import { useState } from "react";
import ModalWindow from "../Modal/Modal";
import { PlusCircleOutlined } from "@ant-design/icons"

const ButtonCreate = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button
        className="project-top__create"
        aria-label="Создать проект"
        type="button"
        onClick={() => setOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: "40px" }} />
      </button>
      <ModalWindow open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ButtonCreate;