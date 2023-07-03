import { useContext, useEffect, useState, ChangeEvent } from "react";
import "../styles/Card.css";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";
import { ModalContext, ModalData } from "../contexts/CardContext";
import { ThemeContext } from "../contexts/ThemeContext";

// export type AssignedObject = {
//   id: number;
// };

export type AssignedObject = {
  id: number;
  name: string;
  desc?: string;
  type?: string;
  assigned?: number[] | undefined;
};

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
  // const [assigned, setAssigned] = useState<AssignedObject[]>(
  //   props.assigned ?? []
  // );

  const [assigned2, setAssigned2] = useState<any>(props.assigned ?? []);

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

    // let res = assigned;
    // const foundAssignedObjectIndex = assigned.findIndex(
    //   (item) => item.id === data.id
    // );

    // if (foundAssignedObjectIndex !== -1) {
    //   // Remove from assigned array
    //   res.splice(foundAssignedObjectIndex, 1);
    //   // setAssigned(res.map((value) => value.id));
    //   // setAssigned(res);
    // } else {
    //   // Add to assigned array
    //   res.push(data);
    //   setAssigned(res);
    // }
  };

  const onDelete = () => {
    setShowConfirm(true);
  };

  const onConfirm = () => {
    let res = objects;

    const foundObject = res.find((item: any) => item.id === id);
    const foundObjectAssigned = foundObject.assigned;

    res.splice(res.indexOf(foundObject), 1);

    for (let i in foundObjectAssigned) {
      let found = res.find((item: any) => item.id === foundObjectAssigned[i]);
      let foundAssigned = res.find(
        (item: any) => item.id === foundObjectAssigned[i]
      ).assigned;
      let updatedAssigned = foundAssigned.filter((i: any) => i !== id);

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

    //Check other relations

    for (let i in assigned2) {
      let found = res.find((j: any) => j.id === assigned2[i]);
      let foundAssigned = found.assigned;

      //if id in foundAssigned, remove
      const isIn = foundAssigned.some((i: any) => i === id);
      if (!isIn) {
        foundAssigned.push(id);
        const updatedObject = {
          id: found.id,
          name: found.name,
          desc: found.decs,
          type: found.type,
          assigned: foundAssigned,
        };
        res[res.indexOf(found)] = updatedObject;
        setObjects(res);
        localStorage.setItem("objects", JSON.stringify(res));
        props.func(objects);
        hideModal();
      } else {
        let filteredAssigned = foundAssigned.filter((i: any) => i !== id);
        const updatedObject = {
          id: found.id,
          name: found.name,
          desc: found.decs,
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

    //add relations
    for (let i in assigned2) {
      let found = res.find((j: any) => j.id === assigned2[i]);
      let foundAssigned = found.assigned;

      foundAssigned.push(itemToSave.id);

      const itemToUpdate = {
        id: found.id,
        name: found.name,
        desc: found.decs,
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
                          item.assigned.some((i: any) => i === modalData.id)
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
            // object={props.}
            object={{ name: name, id: id, assigned: assigned2 }}
            onClick={(e: any) => e.stopPropagation()}
            onConfirm={onConfirm}
          />
        )}
      </div>
    );
  } else return <div></div>;
}
