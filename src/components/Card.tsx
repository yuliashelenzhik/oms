import { useEffect, useState } from "react";
import "../styles/Card.css";
import Button from "./Button";

type CardProps = {
  name?: string;
  desc?: string;
  type?: string;
  showCard?: boolean;
  func?: any;
  equipment?: Array<string>;
  people?: Array<string>;
};

interface Card {
  name: string;
  desc: string;
  type: string;
  showCard?: boolean;
  equipment?: Array<string>;
  people?: Array<string>;
}

export default function Card(props: CardProps) {
  const [showCard, setShowCard] = useState<Boolean>(true);
  const [name, setName] = useState<any>(props.name ?? "");
  const [description, setDescription] = useState<any>(props.desc ?? "");
  const [type, setType] = useState<any>(props.type ?? "");
  const [objects, setObjects] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]")
  );
  //   const [name, setName] = useState('');

  useEffect(() => {}, [objects]);

  const typeOptions = ["person", "computer", "desk", "keyboard"];

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeDesc = (e: any) => {
    setDescription(e.target.value);
  };

  const onChangeType = (e: any) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const onSave = () => {
    // if (exists) {update}
    console.log(name, description, type);
    let res = objects;
    // let existingObjects = JSON.parse(localStorage.getItem("objects") || "[]");
    const itemToSave = {
      name: name,
      desc: description,
      type: type,
    };
    console.log(itemToSave);
    if (name !== "") {
      res.push(itemToSave);
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      //TODO rerender parent
      props.func(objects);
      setShowCard(false);
    } else {
      //TODO let users know the name is required
    }
  };

  const closeCard = () => {
    setShowCard(false);
  };

  if (showCard) {
    return (
      <div className="card-background" onClick={closeCard}>
        <div className="card" onClick={(e) => e.stopPropagation()}>
          <div>
            <input
              type="text"
              onChange={onChangeName}
              value={name}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              value={description}
              type="text"
              placeholder="Description"
              onChange={onChangeDesc}
            />
          </div>
          <div>
            <select onChange={onChangeType}>
              {typeOptions.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            {/* <input type="text" placeholder="Type" /> */}
          </div>
          <div>
            <input type="text" placeholder="Connections" />
          </div>
          <div className="card-btn-container">
            <Button title="Save" onClick={onSave} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}
