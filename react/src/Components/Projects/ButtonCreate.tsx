import { useState } from "react";
import ModalWindow from "../Modal/Modal";
import { PlusCircleOutlined } from "@ant-design/icons";
import ButtonProject from "./ButtonProject";

const ButtonCreate = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonProject
        className="project-top__create"
        onClick={() => setOpen(true)}
      >
        <PlusCircleOutlined
          className="project-top__icon"
          style={{ fontSize: "40px" }}
        />
      </ButtonProject>
      <ModalWindow open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ButtonCreate;
