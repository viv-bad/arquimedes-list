import React, { useState } from "react";

const ItemEdit = ({ item, setShowEdit, onEdit }) => {
  // new local state to set item
  const [newItem, setNewItem] = useState(item.item);
  // handleChange in input field
  const handleChange = (e) => {
    setNewItem(e.target.value);
  };
  // handlesubmit where you use input field as new value to be passed as arg into onEdit function, with item.id,

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(item._id, newItem);
    setShowEdit(false);
  };
  return (
    <div className="m-2">
      <form onSubmit={handleSubmit}>
        <label>Edit item: </label>
        <input
          value={newItem}
          onChange={handleChange}
          className="p-1 border-2 border-blue-500 rounded-full text-sm"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded-full ml-5">
          Save
        </button>
      </form>
    </div>
  );
};

export default ItemEdit;
