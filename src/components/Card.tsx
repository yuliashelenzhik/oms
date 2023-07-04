import { useContext, useState, ChangeEvent } from "react";
import "../styles/Card.css";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { ModalContext, ModalData } from "../contexts/CardContext";
import { ThemeContext } from "../contexts/ThemeContext";

export type AssignedObject = {
  id: number;
  name: string;
  desc?: string;
  type?: string;
  assigned?: number[] | undefined;
};

//Card component

export default function Card(props: ModalData) {
  const { theme } = useContext(ThemeContext);
  const { hideModal, modalData } = useContext(ModalContext);
  const [name, setName] = useState<string>(props.name ?? "");
  const [desc, setDesc] = useState<string>(props.desc ?? "");
  const [type, setType] = useState<string>(props.type ?? "person");
  const id = props.id ?? null;
  const [objects, setObjects] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]")
  );
  const equipment = JSON.parse(localStorage.getItem("objects") || "[]").filter(
    (item: any) => item.type !== "person"
  );
  const people = JSON.parse(localStorage.getItem("objects") || "[]").filter(
    (item: any) => item.type === "person"
  );
  const [assigned2, setAssigned2] = useState<{}[]>(props.assigned ?? []);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  //Options of types
  const typeOptions = ["person", "computer", "desk", "keyboard"];

  //Actions when the card info is changing

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
    let res = assigned2;

    const foundAssignedObjectIndex = res.findIndex(
      (item: any) => item === data.id
    );
    if (foundAssignedObjectIndex !== -1) {
      res.splice(foundAssignedObjectIndex, 1);
    } else {
      res.push(data.id);
    }
    setAssigned2(res);
  };

  //Actions on deleting, saving or updating the card

  const onDelete = () => {
    setShowConfirm(true);
  };

  //Pressed on the child confirm modal, passed through props

  const onConfirm = () => {
    let res = objects;

    const foundObject = res.find((item: any) => item.id === id);
    const foundObjectAssigned = foundObject?.assigned;

    res.splice(res.indexOf(foundObject), 1);
    setObjects(res);
    localStorage.setItem("objects", JSON.stringify(res));
    props.func(objects);
    hideModal();

    for (let i in foundObjectAssigned) {
      let found = res.find((item: any) => item.id === foundObjectAssigned[i]);
      let foundAssigned = res.find(
        (item: any) => item.id === foundObjectAssigned[i]
      ).assigned;
      let updatedAssigned = foundAssigned.filter((i: number) => i !== id);

      let updatedObject = {
        id: found.id,
        name: found.name,
        desc: found.desc,
        type: found.type,
        assigned: updatedAssigned,
      };

      res[res.indexOf(found)] = updatedObject;
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      props.func(objects);
      hideModal();
    }
  };

  //Define if the object exits, choose to add it or to update it

  const saveOrUpdate = () => {
    let res = [...objects];
    const foundObjectIndex = res.findIndex((item) => item.id === id);

    if (foundObjectIndex === -1) {
      onSave();
    } else {
      onUpdate();
    }
  };

  const onUpdate = () => {
    let res = [...objects];

    let updatedObject = {
      id: id,
      name: name,
      desc: desc,
      type: type,
      assigned: assigned2,
    };

    //Update the card object

    let objIndex = res.findIndex((i: any) => i.id === id);
    res[objIndex] = updatedObject;
    setObjects(res);
    localStorage.setItem("objects", JSON.stringify(res));
    props.func(objects);
    hideModal();

    //Check other relations

    for (let i in assigned2) {
      let found = res.find((j: any) => j.id === assigned2[i]);
      let foundAssigned = found.assigned;

      //If id in foundAssigned, remove
      const isIn = foundAssigned.some((i: number) => i === id);
      if (!isIn) {
        foundAssigned.push(id);
        const updatedObject = {
          id: found.id,
          name: found.name,
          desc: found.desc,
          type: found.type,
          assigned: foundAssigned,
        };
        res[res.indexOf(found)] = updatedObject;
        setObjects(res);
        localStorage.setItem("objects", JSON.stringify(res));
        props.func(objects);
        hideModal();
      } else {
        let filteredAssigned = foundAssigned.filter((i: number) => i !== id);
        const updatedObject = {
          id: found.id,
          name: found.name,
          desc: found.desc,
          type: found.type,
          assigned: filteredAssigned,
        };

        res[res.indexOf(found)] = updatedObject;
        setObjects(res);
        localStorage.setItem("objects", JSON.stringify(res));
        props.func(objects);
        hideModal();
      }
    }
  };

  // When the item is not saved, add it

  const onSave = () => {
    let res = [...objects];
    const ids = res.map((item) => {
      return item.id;
    });
    const max = Math.max(...ids);
    const itemToSave = {
      id: ids.length > 0 ? max + 1 : 0,
      name: name,
      desc: desc,
      type: type,
      assigned: assigned2,
    };

    res.push(itemToSave);
    props.func(res);

    //Add relations
    for (let i in assigned2) {
      let found = res.find((j: any) => j.id === assigned2[i]);
      let foundAssigned = found.assigned;

      foundAssigned.push(itemToSave.id);

      const itemToUpdate = {
        id: found.id,
        name: found.name,
        desc: found.desc,
        type: found.type,
        assigned: foundAssigned,
      };

      res[res.indexOf(found)] = itemToUpdate;
    }

    setObjects(res);
    localStorage.setItem("objects", JSON.stringify(res));
    props.func(res);
    hideModal();
  };

  //Rendering the card

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
                {equipment.map((item: any) => {
                  const checked = props.assigned?.some((id) => id === item.id);
                  return (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={() => onChangeAssigned(item)}
                      />
                      <span>{item.name.toLowerCase()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="relations">
              <p>Assigned to</p>
              <div className="checkbox-container">
                {people.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        value={item}
                        defaultChecked={
                          item.assigned !== undefined &&
                          item.assigned.some((i: number) => i === modalData.id)
                        }
                        onChange={() => onChangeAssigned(item)}
                      />
                      <span>{item.name.toLowerCase()}</span>
                    </div>
                  );
                })}
              </div>
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
            <Button title="Save" onClick={saveOrUpdate} />
            <Button title="Delete" onClick={onDelete} />
          </div>
        </div>
        {showConfirm && (
          <ConfirmModal
            object={{ name: name, id: id, assigned: assigned2 }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
            onConfirm={onConfirm}
          />
        )}
      </div>
    );
  } else return <div></div>;
}
