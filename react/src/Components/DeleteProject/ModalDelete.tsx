import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ModalDelete: React.FC<Props> = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Удалить проект?"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Удалить"
      okButtonProps={{ danger: true }}
      cancelButtonProps={{ style: { display: "none" } }}
      centered
      closeIcon={
        <span style={{ color: "#000000", fontSize: "18px" }}>
          <CloseOutlined />
        </span>
      }
    >
      <p className=" text-dark">Вы действительно хотите удалить проект?</p>
    </Modal>
  );
};

export default ModalDelete;
