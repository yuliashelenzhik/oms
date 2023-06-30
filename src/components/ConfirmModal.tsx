import Button from "./Button";
import "../styles/ConfirmModal.css";
import { ReactComponent as CloseIcon } from "../icons/x.svg";

type ConfirmModalProps = {
  object: {
    name: string;
    id: number;
  };
  onClick?: any;
  onConfirm?: any;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  console.log(props);
  const object = props.object;
  return (
    <div className="confirm-modal-bg">
      <div className="confirm-modal-container" onClick={props.onClick}>
        <CloseIcon />
        <p>
          {"Are you sure you want to remove the object "}
          <span>{object.name}</span>
          {"?"}
        </p>
        <div className="buttons">
          <Button title="cancel" />{" "}
          <Button title="confirm" onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
}
