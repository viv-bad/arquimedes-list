import React, { useState } from "react";

const ItemCreate = ({ onCreate }) => {
  // create new local state for input into the input field
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    // set the input string to the valu typed in to the input
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    // prevent browser refresh
    e.preventDefault();
    // call the onCreate function which was passed thorough props with the item argument as the input
    onCreate(input);
    setInput("");
  };

  // JSX to be returned
  return (
    <div className="py-10 px-5 h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-between items-center ">
      <form onSubmit={handleSubmit} className="flex ml-1 gap-3 ">
        <input
          type="text"
          name="name"
          placeholder="Add item..."
          value={input}
          onChange={handleChange}
          className="p-1 border-2 border-blue-500 rounded-lg w-96 max-lg:w-64 max-sm:w-44 max-sm:p-0"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-lg max-sm:text-xs max-sm:py-1.5  max-sm:px-3">
          Add
        </button>
      </form>

      <div className="flex items-center gap-4">
        <h1 className="text-white font-semibold text-3xl font-sans max-sm:text-xs max-sm:hidden">
          Arquimedes' List
        </h1>
        <img
          src={require("../assets/logo-3.png")}
          alt="logo"
          className="object-scale-down h-14 w-14 max-sm:h-10 max-sm:w-7 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ItemCreate;
