import { DeleteOutlined } from "@ant-design/icons";
import type { Project } from "../../../shared/props/type";
import ModalDelete from "./ModalDelete";
import { useState } from "react";
import { useProject } from "../../Context/Project/ProjectContext";
import ButtonProject from "../ButtonProject";

const DeleteProject: React.FC<{ project: Project }> = ({ project }) => {
  const { deleteProject } = useProject();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonProject
        onClick={(e) => {
          setOpen(true);
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DeleteOutlined style={{ fontSize: "24px" }} />
      </ButtonProject>
      <ModalDelete
        open={open}
        project={project}
        onCancel={() => setOpen(false)}
        onConfirm={() => deleteProject(project.id)}
      />
    </>
  );
};

export default DeleteProject;
