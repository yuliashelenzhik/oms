import { useContext, useEffect, useState, ChangeEvent } from "react";
import "../styles/Card.css";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { ModalContext, ModalData } from "../contexts/CardContext";
import { ThemeContext } from "../contexts/ThemeContext";

export type AssignedObject = {
  id: number;
  name: string;
};

// type CardProps = {
//   id?: number;
//   name?: string;
//   desc?: string;
//   type?: string;
//   func?: any;
//   equipment?: string[];
//   people?: string[];
//   assigned?: AssignedObject[];
//   assignedTo?: AssignedObject[];
// };

export default function Card(props: ModalData) {
  const { theme } = useContext(ThemeContext);
  const { hideModal, modalData } = useContext(ModalContext);

  const [name, setName] = useState<string>(props.name ?? "");
  const [id, setId] = useState<number>(props.id ?? null);
  const [desc, setDesc] = useState<string>(props.desc ?? "");
  const [type, setType] = useState<string>(props.type ?? "person");

  const [objects, setObjects] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]")
  );
  const [equipment, setEquipment] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]").filter(
      (item: any) => item.type !== "person"
    )
  );
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]").filter(
      (item: any) => item.type === "person"
    )
  );
  const [assigned, setAssigned] = useState<AssignedObject[]>(
    props.assigned ?? []
  );
  const [assignedTo, setAssignedTo] = useState<AssignedObject[]>(
    props.assigned ?? []
  );
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const typeOptions = ["person", "computer", "desk", "keyboard"];

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const onChangeAssigned = (data: AssignedObject) => {
    let res = assigned;

    const foundAssignedObjectIndex = assigned.findIndex(
      (item) => item.id === data.id
    );

    if (foundAssignedObjectIndex !== -1) {
      // Remove from assigned array
      console.log("FOUND, TO REMOVE");
      res.splice(foundAssignedObjectIndex, 1);
      console.log(res);
      setAssigned(res);
    } else {
      // Add to assigned array
      console.log("NOT FOUND, TO ADD");
      res.push(data);
      console.log(res);
      setAssigned(res);
    }
  };

  const onDelete = () => {
    setShowConfirm(true);
  };

  const onConfirm = () => {
    let res = objects;
    const foundObject = res.filter(
      (item: any) => item.id === id && item.name === name
    );
    if (foundObject.length > 0) {
      res.splice(res.indexOf(foundObject[0]), 1);
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      props.func(objects);
      setShowConfirm(false);
      hideModal();
    }
  };
  const onSave = (e: any) => {
    //  TODO let users know the name is required

    let res = [...objects];
    const foundObjectIndex = res.findIndex((item) => item.id === id);

    if (foundObjectIndex === -1) {
      // Add new object
      const ids = res.map((item) => {
        return item.id;
      });
      const max = Math.max(...ids);
      const itemToSave = {
        id: max + 1,
        name: name,
        desc: desc,
        type: type,
        assigned: assigned,
      };
      res.push(itemToSave);
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      props.func(objects);
      hideModal();
    } else {
      //Update the existing object

      const itemToSave = {
        id: res[foundObjectIndex].id,
        name: name,
        desc: desc,
        type: type,
        assigned: assigned,
      };

      res[foundObjectIndex] = itemToSave;
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      props.func(objects);
      hideModal();
    }
  };

  if (modalData) {
    return (
      <div className="card-background" onClick={hideModal}>
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
              value={desc}
              type="text"
              placeholder="Description"
              onChange={onChangeDesc}
            />
          </div>
          <div>
            <select
              onChange={onChangeType}
              className="type-select"
              defaultValue={type}
            >
              {typeOptions.map((item, index) => {
                return (
                  <option className="typeOption" value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          {type === "person" ? (
            <div className="relations">
              <p>Assigned</p>
              <div className="checkbox-container">
                {equipment.map((item: any, index: number) => {
                  const assignedToSelectedObject = objects.find(
                    (item: any) => item.id === props.id
                  )?.assigned;
                  return (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        defaultChecked={
                          assignedToSelectedObject !== undefined &&
                          assignedToSelectedObject.some(
                            (e: any) => e.id === item.id
                          )
                        }
                        onChange={() => onChangeAssigned(item)}
                      />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relations">
              <p>Assigned to</p>
              {/* <div className="checkbox-container">
                {people.map((item: any) => {
                  console.log(item);
                  const find = objects.find(
                    (item: any) => item.id === props.id
                  ).assigned;
                  console.log(find);
                  return (
                    <div key={item.id}>
                      <input type="checkbox" name="" id="" value={item} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div> */}
            </div>
          )}

          <div
            className={
              theme === "dark"
                ? "card-btn-container"
                : "card-btn-container-light"
            }
          >
            <Button title="Cancel" onClick={hideModal} />
            <Button title="Save" onClick={onSave} />
            <Button title="Delete" onClick={onDelete} />
          </div>
        </div>
        {showConfirm && (
          <ConfirmModal
            // object={props.}
            object={{ name: name, id: id, assigned: assigned }}
            onClick={(e: any) => e.stopPropagation()}
            onConfirm={onConfirm}
          />
        )}
      </div>
    );
  } else return <div></div>;
}
