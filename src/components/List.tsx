import { useEffect, useState } from "react";
import { ReactComponent as AddIcon } from "../icons/plus-circle.svg";
import { ReactComponent as EditIcon } from "../icons/edit-2.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash-2.svg";
import Card from "./Card";

export default function List(props: any) {
  const [selectedObject, setSelectedObject] = useState({
    id: 0,
    name: "",
    desc: "",
    type: "person",
  });
  const [showCard, setShowCard] = useState<Boolean>(false);
  const [objects, setObjects] = useState([]);
  // const [filtered, setFiltered] = useState([]);

  // useEffect(() => {
  //   console.log(selectedObject);
  // }, [selectedObject]);

  // useEffect(() => {
  //   setShowCard(showCard);
  //   console.log(showCard);
  // }, [showCard]);

  useEffect(() => {
    setObjects(JSON.parse(localStorage.getItem("objects") || "[]"));
  }, [showCard]);

  const getDataFromChild = (data: any) => {
    setObjects(data);
    console.log(data);
    console.log(showCard);
    // console.log("data from card: " + JSON.stringify(data));
  };

  // const getShowCard = (data: any) => {
  //   console.log(data);
  //   // setShowCard(data)
  // };

  const onAdd = () => {
    // console.log("add obj");
    setSelectedObject({
      id: 0,
      name: "",
      desc: "",
      type: "person",
    });
    setShowCard(true);

    // console.log(selectedObject);
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

      {(props.filtered.length > 0 ? props.filtered : objects)
        .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
        .map((item: any, index: number) => {
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
        })}
      {showCard && (
        // <div className="card-container">
        <Card
          showCard={showCard}
          func={getDataFromChild}
          id={selectedObject.id}
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
