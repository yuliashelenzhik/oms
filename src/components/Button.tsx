import "../styles/Button.css";

export default function Button(props: any) {
  return (
    <div className="button" onClick={props.onClick}>
      {props.title ?? "Button"}
    </div>
  );
}
