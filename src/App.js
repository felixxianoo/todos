import "./App.css";
import { useState } from "react";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!newItem) {
      alert("Enter a task");
      return;
    };

    const item = {
      bool: false,
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      date: new Date(),
    };
    console.log(item);

    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  };

  const returnClick = (e) => {
    if (e.key === "Enter") {
      addItem();
    };
  };

  const deleteItem = (id) => {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  };

  const completedItem = (id) => {
    setItems((previousItemList) => {
      const newList = [...previousItemList];
      const chosen = newList.find((item) => item.id == id);
      chosen.bool = true;
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
                  <div
                    className={
                      item.bool ? "completed" : ""
                    }
                  >
                    <h4>{item.value}</h4>
                  </div>
                  <div className="checkoff">
                    <button
                      className="normal"
                      onClick={() => completedItem(item.id)}
                    >
                      &#10003;
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      X{" "}
                    </button>
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
