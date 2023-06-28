import { useEffect, useState } from "react";
import { ReactComponent as AddIcon } from "../icons/plus-circle.svg";
import { ReactComponent as EditIcon } from "../icons/edit-2.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash-2.svg";
import Card from "./Card";

export default function List(props: any) {
  const [selectedObject, setSelectedObject] = useState({
    name: "",
    desc: "",
    type: "",
  });
  const [showCard, setShowCard] = useState<Boolean>(false);
  const [objects, setObjects] = useState([]);

  console.log("props.filtered");
  console.log(props.filtered);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    console.log(selectedObject);
  }, [selectedObject]);

  useEffect(() => {
    setObjects(JSON.parse(localStorage.getItem("objects") || "[]"));
  }, [showCard]);

  const getDataFromChild = (data: any) => {
    setObjects(data);
    console.log("data from card: " + JSON.stringify(data));
  };

  const onAdd = () => {
    setSelectedObject({
      name: "",
      desc: "",
      type: "",
    });
    setShowCard(true);
    console.log("add obj");
  };

  return (
    <div className="list-container">
      <div className="add" onClick={onAdd}>
        <AddIcon />
      </div>
      <div className="list-headers-container">
        <div className="list-headers">
          <p>Name</p>
          <p>Description</p>
          <p>Type</p>
        </div>
      </div>

      {(props.filtered.length > 0 ? props.filtered : objects).map(
        (item: any, index: number) => {
          return (
            <div
              className="list"
              key={index}
              onClick={() => {
                setSelectedObject(item);
                setShowCard(true);
              }}
            >
              <div className="list-item-details">
                <p>{item.name.toLowerCase()}</p>
                <p>{item.desc.toLowerCase()}</p>
                <p>{item.type.toLowerCase()}</p>
              </div>
              {/* <div className="list-item-edit">
              <div className="edit">
                <EditIcon />
              </div>
              <div className="delete">
                <DeleteIcon />
              </div>
            </div> */}
            </div>
          );
        }
      )}
      {showCard && (
        // <div className="card-container">
        <Card
          func={getDataFromChild}
          name={selectedObject.name}
          desc={selectedObject.desc}
          type={selectedObject.type}
          // showCard={true}
        />
        // </div>
      )}
    </div>
  );
}
