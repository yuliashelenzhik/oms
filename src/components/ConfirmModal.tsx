import Button from "./Button";
import "../styles/ConfirmModal.css";
import { ModalContext } from "../contexts/CardContext";
import { useContext } from "react";

type ConfirmModalProps = {
  object: {
    name: string;
    id: number;
    assigned?: {}[];
  };
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onConfirm?: () => void;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const { hideModal } = useContext(ModalContext);
  const object = props.object;
  return (
    <div className="confirm-modal-bg">
      <div className="confirm-modal-container" onClick={props.onClick}>
        <p>
          {"Are you sure you want to remove the object "}
          <span>{object.name}</span>
          {"?"}
        </p>
        <div className="buttons">
          <Button title="cancel" onClick={hideModal} />
          <Button title="confirm" onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
}
