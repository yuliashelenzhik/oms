import { useEffect, useState } from "react";
import "../styles/Card.css";
import Button from "./Button";

type CardProps = {
  id: number;
  name?: string;
  desc?: string;
  type?: string;
  showCard?: any;
  func?: any;
  equipment?: Array<string>;
  people?: Array<string>;
  assigned?: Array<any>;
  assignedTo?: Array<any>;
};

export default function Card(props: CardProps) {
  const [showCard, setShowCard] = useState<Boolean>(props.showCard);
  const [name, setName] = useState<any>(props.name ?? "");
  const [id, setId] = useState<any>(props.id ?? 0);
  const [description, setDescription] = useState<any>(props.desc ?? "");
  const [type, setType] = useState<any>(props.type ?? "person");
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
  const [assigned, setAssigned] = useState([]);
  // const [assigned, setAssigned] = useState(
  //   equipment.map((item: any) => ({ ...item, checked: false }))
  // );

  // const [assigned, setAssigned] = useState(
  //   new Array(equipment.length).fill({ checked: false })
  // );

  // const equipmentOptions = equipment.map((item: any) => {
  //   return item.name;
  // });

  // console.log(equipmentOptions);
  //   const [name, setName] = useState('');

  // useEffect(() => {}, [objects]);

  useEffect(() => {
    console.log(props);
    setShowCard(props.showCard);
    // console.log(props.showCard);
  }, [props.showCard]);

  useEffect(() => {
    console.log(assigned);
  }, [onCheckEquipment]);

  const typeOptions = ["person", "computer", "desk", "keyboard"];

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeDesc = (e: any) => {
    setDescription(e.target.value);
  };

  const onChangeType = (e: any) => {
    // console.log(e.target.value);
    setType(e.target.value);
  };

  // const onAssign = () => {
  //   console.log(equipment);
  // };

  const onDelete = () => {
    let res = objects;
    const foundObject = res.filter(
      (item: any) => item.id === id && item.name === name
    );
    if (foundObject.length > 0) {
      res.splice(res.indexOf(foundObject[0]), 1);
      setObjects(res);
      localStorage.setItem("objects", JSON.stringify(res));
      props.func(objects);
      setShowCard(false);

      // props.showCard(false);
    }
  };

  const onSave = () => {
    let res = objects;
    const foundObject = res.filter(
      (item: any) => item.id === id && item.name === name
    );

    //UPDATE THE EXISTING OBJECT

    if (foundObject.length > 0) {
      const itemToSave = {
        id: foundObject[0].id,
        name: name,
        desc: description,
        type: type,
        // assigned: assigned
      };
      res.splice(res.indexOf(foundObject[0]), 1);

      if (name !== "") {
        res.push(itemToSave);
        setObjects(res);
        localStorage.setItem("objects", JSON.stringify(res));
        props.func(objects);
        setShowCard(false);
        // props.showCard(false);
      } else {
        //TODO let users know the name is required
      }
    } else {
      // ADD NEW OBJECT
      const ids = objects.map((item: any) => {
        return item.id;
      });
      const max = Math.max(...ids);
      const itemToSave = {
        id: max + 1,
        name: name,
        desc: description,
        type: type,
        assigned: assigned,
      };
      if (name !== "") {
        res.push(itemToSave);
        setObjects(res);
        localStorage.setItem("objects", JSON.stringify(res));
        props.func(objects);
        setShowCard(false);
        // props.showCard(false);
      } else {
        //TODO let users know the name is required
      }
    }
  };

  function onCheckEquipment(position: any) {
    let res = [];
    // console.log()
    // const updateAssigned = assigned.map((item: any, index: any) => {
    //   return index === position ? !item : item;
    // });
    // // console.log(updateAssigned);
    // setAssigned(updateAssigned);
  }

  const closeCard = () => {
    //TOFIX
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
                  return (
                    <div key={item.id}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={() => onCheckEquipment(item.checked)}
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
              <div className="checkbox-container">
                {people.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <input type="checkbox" name="" id="" value={item} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* <select
              onChange={onAssign}
              multiple={true}
              className="relations-select"
            >
              {equipment.map((item: any, index: any) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select> */}
          {/* <input type="text" placeholder="Connections" /> */}
          {/* </div> */}
          <div className="card-btn-container">
            <Button title="Save" onClick={onSave} />
            <Button title="Delete" onClick={onDelete} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}
