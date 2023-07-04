import React, { MouseEvent } from "react";
import "../styles/Button.css";

type ButtonProps = {
  title?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

//Default button component

export default function Button(props: ButtonProps) {
  return (
    <div className="button" onClick={props.onClick}>
      {props.title ?? ""}
    </div>
  );
}
