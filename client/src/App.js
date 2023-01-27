import React, { useEffect, useState } from "react";
import ItemCreate from "./components/ItemCreate";
import ItemList from "./components/ItemList";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    // make sure to use http not https
    // const response = axios.get("http://localhost:3001/getItemss");

    // const { data } = response;

    // setItems(data);
    // console.log(data);

    axios
      .get("http://localhost:3001/getItems")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async (item) => {
    const response = await axios.post("http://localhost:3001/createItem", {
      item,
    });

    const { data } = response;

    setItems([...items, data]);
    // create the new object with the new item and an id
    // const newItem = {
    //   id: Math.ceil(Math.random() * 1000),
    //   item,
    // };

    // set the state array to the original item object plus the new item object
    // setItems([...items, newItem]);
  };

  const deleteItemById = async (itemId) => {
    // REMEMBER: in mongodb, id is saved as _id instead!!
    await axios.delete(`http://localhost:3001/deleteItem/${itemId}`);

    const updatedItems = items.filter((item) => {
      return item._id !== itemId;
    });
    // // console.log(updatedItems);
    setItems(updatedItems);
  };

  const editItemById = async (itemId, newItem) => {
    // Remember: In an axios patch request, the second argument after the url is the original object (key) (taken from Schema in backend) and the new object you want to replace it with (value). THIS second argument is the data (payload) that goes back to the database.
    const response = await axios.patch(
      `http://localhost:3001/updateItem/${itemId}`,
      { item: newItem }
    );

    const { data } = response;
    console.log(data);

    const updatedItem = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          item: newItem,
        };
      }
      return item;
    });

    setItems(updatedItem);
    console.log(items);
  };

  // add function to toggle completed to true
  const toggleCompleted = async (itemId, isItemCompleted) => {
    // access database and patch completed with either true or false, based on the argument isItemCompleted
    const response = await axios.patch(
      `http://localhost:3001/completeItem/${itemId}`,
      { completed: isItemCompleted }
    );

    console.log(response.data.completed);
    // // console.log(data.completed);
    // console.log(isCompleted);
    // update the data on the frontend with the data
    const updatedComplete = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          completed: isItemCompleted,
        };
      }
      return item;
    });

    // console.log(updatedComplete);
    setItems(updatedComplete);
    // setIsCompleted(!isItemCompleted);
  };

  const toggleVivek = async (itemId, personSelected) => {
    const response = await axios.patch(
      `http://localhost:3001/assignItemToPerson/${itemId}`,
      { vivek: personSelected }
    );

    const updatedPerson = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          vivek: personSelected,
        };
      }
      return item;
    });

    console.log(updatedPerson);
    setItems(updatedPerson);
  };

  const toggleKhadija = async (itemId, personSelected) => {
    const response = await axios.patch(
      `http://localhost:3001/assignItemToPerson/${itemId}`,
      { khadija: personSelected }
    );

    const updatedPerson = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          khadija: personSelected,
        };
      }
      return item;
    });

    console.log(updatedPerson);
    setItems(updatedPerson);
  };

  return (
    <div>
      <ItemCreate onCreate={createItem} />
      <ItemList
        items={items}
        onDelete={deleteItemById}
        onEdit={editItemById}
        onComplete={toggleCompleted}
        onToggleVivek={toggleVivek}
        onToggleKhadija={toggleKhadija}
      />
    </div>
  );
};

export default App;
