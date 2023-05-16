import "./App.css";
import { Component, useState } from "react";
import { FaCheck, FaPencilAlt, FaTrash, FaRegSave } from "react-icons/fa";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const addItem = () => {
    if (!newItem) {
      alert("Enter a task");
      return;
    };

    const item = {
      bool: false,
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  };

  const saveItem = () => {
    if (!editItem) {
      alert("Empty task field not allowed");
      return;
    };
    setItems((prevTask) =>
      prevTask.map((item) =>
        item.id === editItemId ? { ...item, value: editItem } : item )
    );
    setEditItem("");
    setEditItemId(null);
  };

  const returnClick = (e) => {
    if (e.key === "Enter") {
      addItem();
    };
  };

  const editItemFunction = (id, value) => {
    setEditItem(value);
    setEditItemId(id);
  };

  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id 
    !== id)
    setItems(newArray);
  };

  const completedItem = (id) => {
    setItems((previousItemList) => {
      const newList = [...previousItemList];
      const chosen = newList.find((item) => item.id 
      == id)
      chosen.bool = true
      return newList;
    });
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <h2>Task organizer</h2>
          <div className="add-section">
            <input
              className="input"
              type="text"
              placeholder="Enter task"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={returnClick}
            />
            <button className="submit" onClick={() => addItem()}>
              Submit
            </button>
          </div>
        </div>
        <div className="task-list">
          <ul className="list-item">
            {items.map((item) => {
              return (
                <li key={item.id}>
                  <div className={item.bool ? "completed" : "non-complete"}>
                    {item.id === editItemId ? (
                      <input
                        className="editInput"
                        type="text"
                        value={editItem}
                        onChange={(e) => setEditItem(e.target.value)}
                      />
                    ) : (
                      <h4>{item.value}</h4>
                    )}
                    <div className="checkoffs">
                      <button
                        className="checkmark"
                        onClick={() => completedItem(item.id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                      {item.id === editItemId ? (
                        <button className="save" onClick={saveItem}>
                          <FaRegSave />
                        </button>
                      ) : (
                        <button
                          className="edit"
                          onClick={() => editItemFunction(item.id, item.name)}
                        >
                          <FaPencilAlt />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
