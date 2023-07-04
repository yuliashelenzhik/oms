import { useContext, useEffect, useState } from "react";
import { ReactComponent as AddIcon } from "../icons/plus-circle.svg";
import Card from "./Card";
import "../styles/List.css";
import { ModalContext, ModalData } from "../contexts/CardContext";
import { ThemeContext, ThemeContextType } from "../contexts/ThemeContext";

export type ListProps = {
  filtered: ModalData[];
};

export default function List(props: ListProps) {
  const { theme, colors } = useContext<ThemeContextType>(ThemeContext);
  const [selectedObject, setSelectedObject] = useState<ModalData>({
    id: null,
    name: "",
    desc: "",
    type: "person",
    assigned: [],
  });
  const [objects, setObjects] = useState<{}[]>([]);
  const [filtered, setFiltered] = useState<{}[]>([props.filtered]);
  const { showModal, modalData } = useContext(ModalContext);
  const openModal = (object: ModalData) => {
    const data: ModalData = {
      id: object.id,
      name: object.name,
      desc: object.desc,
      type: object.type,
      assigned: object.assigned,
    };
    showModal(data);
  };

  useEffect(() => {
    setObjects(JSON.parse(localStorage.getItem("objects") || "[]"));
  }, [modalData]);

  const getDataFromChild = (data: any) => {
    setObjects(data);
  };

  useEffect(() => {
    setFiltered(objects);
  }, [objects, filtered]);

  const onAdd = () => {
    setSelectedObject({
      id: null,
      name: "",
      desc: "",
      type: "person",
      assigned: [],
    });
    showModal(selectedObject);
  };

  return (
    <div className="list-container">
      <div
        className={theme === "dark" ? "add-dark" : "add-light"}
        onClick={onAdd}
      >
        <AddIcon />
      </div>
      <div className="list-headers-container">
        <div
          className="list-headers"
          style={
            theme === "light"
              ? { color: colors.textTertiary }
              : { color: colors.textSecondary }
          }
        >
          <p>Name</p>
          <p>Description</p>
          <p>Type</p>
        </div>
      </div>

      {(props.filtered.length > 0 ? props.filtered : [])
        .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
        .map((item: any, index: number) => {
          return (
            <div
              className="list"
              key={index}
              onClick={() => {
                setSelectedObject(item);
                openModal(item);
              }}
            >
              <div
                className="list-item-details"
                style={{ color: colors.textPrimary }}
              >
                <p>
                  {item.name.length > 15
                    ? item.name.substring(0, 15).toLowerCase() + "..."
                    : item.name.toLowerCase()}
                </p>
                <p>
                  {item.desc?.length > 15
                    ? item.desc?.substring(0, 15).toLowerCase() + "..."
                    : item.desc?.toLowerCase()}
                </p>
                <p>{item.type?.toLowerCase()}</p>
              </div>
            </div>
          );
        })}
      {modalData && (
        <Card
          func={getDataFromChild}
          id={selectedObject.id}
          name={selectedObject.name}
          desc={selectedObject.desc}
          type={selectedObject.type}
          assigned={selectedObject.assigned}
        />
      )}
    </div>
  );
}
