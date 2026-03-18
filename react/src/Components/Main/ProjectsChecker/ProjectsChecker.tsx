import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const ProjectChecker = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
}) => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/myProject");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        title="Мы увидели что у вас уже есть проекты, хотите перейти к ним?"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"нет"}
        okText={"Да"}
        centered
        cancelButtonProps={{ style: { background: "red" } }}
      ></Modal>
    </>
  );
};

export default ProjectChecker;
