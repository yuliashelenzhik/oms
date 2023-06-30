import "../styles/Button.css";

type ButtonProps = {
  title?: string;
  onClick?: any;
};

export default function Button(props: ButtonProps) {
  return (
    <div className="button" onClick={props.onClick}>
      {props.title ?? ""}
    </div>
  );
}
