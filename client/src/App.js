import React, { useEffect, useState } from "react";
import ItemCreate from "./components/ItemCreate";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    // make sure to use http not https
    // http://localhost:3000/ - local dev host
    // https://arquimedes-list-api-v2.onrender.com/ online hosted server

    axios
      .get("https://arquimedes-list-api-v2.onrender.com/getItems")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async (item) => {
    const response = await axios.post(
      "https://arquimedes-list-api-v2.onrender.com/createItem",
      {
        item,
      }
    );

    const { data } = response;

    // set the state array to the original item object plus the new item object
    //add new item data to the start/top of the list
    setItems([data, ...items]);
  };

  const deleteItemById = async (itemId) => {
    // REMEMBER: in mongodb, id is saved as _id instead!!
    await axios.delete(
      `https://arquimedes-list-api-v2.onrender.com/deleteItem/${itemId}`
    );

    const updatedItems = items.filter((item) => {
      //return every item that is not of the itemId of the item of choice
      return item._id !== itemId;
    });
    //set the state to the new array of filtered items
    setItems(updatedItems);
  };

  const editItemById = async (itemId, newItem) => {
    // Remember: In an axios patch request, the second argument after the url is the original object (key) (taken from Schema in backend) and the new object you want to replace it with (value). THIS second argument is the data (payload) that goes back to the database.
    const response = await axios.patch(
      `https://arquimedes-list-api-v2.onrender.com/updateItem/${itemId}`,
      { item: newItem }
    );

    const { data } = response;

    const updatedItem = items.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          item: newItem,
        };
      }
      return item;
    });

    setItems(updatedItem);
  };

  // add function to toggle completed to true
  const toggleCompleted = async (itemId, isItemCompleted) => {
    // access database and patch completed with either true or false, based on the argument isItemCompleted
    const response = await axios.patch(
      `https://arquimedes-list-api-v2.onrender.com/completeItem/${itemId}`,
      { completed: isItemCompleted }
    );
    // update the data on the frontend with the data
    const updatedComplete = items.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          completed: isItemCompleted,
        };
      }
      return item;
    });

    setItems([...items, updatedComplete]);
  };

  const togglePersonOne = async (itemId, personSelected) => {
    const response = await axios.patch(
      `https://arquimedes-list-api-v2.onrender.com/assignItemToPerson/${itemId}`,
      { personOne: personSelected }
    );

    const updatedPerson = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          personOne: personSelected,
        };
      }
      return item;
    });
    console.log(updatedPerson);
    setItems(updatedPerson);
  };

  const togglePersonTwo = async (itemId, personSelected) => {
    const response = await axios.patch(
      `https://arquimedes-list-api-v2.onrender.com/assignItemToPerson/${itemId}`,
      { personTwo: personSelected }
    );

    const updatedPerson = items.map((item) => {
      if (item._id === itemId) {
        return {
          // ...response.data
          ...item,
          personTwo: personSelected,
        };
      }
      return item;
    });

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
        onTogglePersonOne={togglePersonOne}
        onTogglePersonTwo={togglePersonTwo}
      />
      <Footer />
    </div>
  );
};

export default App;
