import { useContext, useEffect, useState } from "react";
import { ReactComponent as AddIcon } from "../icons/plus-circle.svg";
import { ReactComponent as EditIcon } from "../icons/edit-2.svg";
import { ReactComponent as DeleteIcon } from "../icons/trash-2.svg";
import Card from "./Card";
import "../styles/List.css";
import { ModalContext, ModalData } from "../contexts/CardContext";

export default function List(props: any) {
  const [selectedObject, setSelectedObject] = useState({
    id: 0,
    name: "",
    desc: "",
    type: "person",
  });
  // const [showCard, setShowCard] = useState<Boolean>(false);
  const [objects, setObjects] = useState([]);
  const { showModal, hideModal, modalData } = useContext(ModalContext);

  const openModal = (object: any) => {
    console.log("openModal");
    console.log(object);

    const data: ModalData = {
      id: object.id,
      name: object.name,
      desc: object.desc,
      type: object.type,
    };
    // console.log(data);
    showModal(data);
  };

  // const closeModal = () => {
  //   hideModal();
  // };

  useEffect(() => {
    setObjects(JSON.parse(localStorage.getItem("objects") || "[]"));
  }, [modalData]);

  const getDataFromChild = (data: any) => {
    setObjects(data);
    // console.log(showCard);
  };

  const onAdd = () => {
    setSelectedObject({
      id: 0,
      name: "",
      desc: "",
      type: "person",
    });
    showModal(selectedObject);
    // setShowCard(true);
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
                openModal(item);
                // setShowCard(true);
                // console.log("onclick");
                // console.log(showCard);
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
      {modalData && (
        // <div className="card-container">
        <Card
          // showCard={showCard}
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
