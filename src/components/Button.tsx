import React, { MouseEvent } from "react";
import "../styles/Button.css";

type ButtonProps = {
  title?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export default function Button(props: ButtonProps) {
  return (
    <div className="button" onClick={props.onClick}>
      {props.title ?? ""}
    </div>
  );
}
