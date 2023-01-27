import React, { useEffect, useState } from "react";
import ItemEdit from "./ItemEdit";
const ItemShow = ({
  item,
  onDelete,
  onEdit,
  onComplete,
  onToggleVivek,
  onToggleKhadija,
}) => {
  const [crossOut, setCrossOut] = useState(false);
  // const [completed, setCompleted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [vivek, setVivek] = useState(false);
  const [khadija, setKhadija] = useState(false);
  // create handle delete function to pass onDelete function with itemid as arg.
  // Item is passed as props as individual mapped item from item object
  const handleDelete = () => {
    onDelete(item._id);
    // console.log(item._id);
  };

  const handleCrossOut = () => {
    if (item.completed) {
      setCrossOut(false);
    } else {
      setCrossOut(true);
    }
    // setCrossOut to true and pass it through the onComplete function, which uses true as the argument for isCompleted
    onComplete(item._id, !item.completed);
    // pass boolean to isCompleted state (which was passed down as props from App.js parent)

    // if completed is true run the if statement
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
    // onEdit(item.id, )
  };

  const handleV = () => {
    setVivek(!vivek);
    onToggleVivek(item._id, !item.vivek);
  };

  const handleK = () => {
    setKhadija(!khadija);
    onToggleKhadija(item._id, !item.khadija);
  };

  //here, we assign the highlighted violet tag class if vivek is true (upon clicking handleV) or khadija is true (clicking handleK), else we leave the button as an unhighlighted classname
  let selected = (
    <div className="flex gap-3">
      <button
        className={
          item.vivek
            ? "bg-violet-500" + " px-2 rounded-full text-white"
            : "bg-white" +
              " px-2 rounded-full text-black hover:bg-violet-500 hover:text-white"
        }
        onClick={handleV}
      >
        {item.vivek ? "Vivek" : "V"}
      </button>

      <button
        className={
          item.khadija
            ? "bg-fuchsia-500" + " px-2 rounded-full text-white"
            : "bg-white" +
              " px-2 rounded-full text-black hover:bg-fuchsia-500 hover:text-white"
        }
        onClick={handleK}
      >
        {item.khadija ? "Khadija" : "K"}
      </button>
    </div>
  );

  // set the content to be the list of items with the cross out button
  let content = (
    <div className="flex gap-4">
      <h3 className="font-semibold">{item.item}</h3>
      <div>
        <button onClick={handleCrossOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:scale-110 hover:stroke-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  // if item.completed (in the database) is true then cross out the item
  let today = new Date().toLocaleDateString();

  // let time = today.getTime();

  if (item.completed) {
    content = (
      <div className="flex gap-4">
        <h3>
          {" "}
          <s className="text-blue-500">
            {" "}
            <span className="text-black"> {item.item} </span>
          </s>
          <br />
          <span className="text-red-400">Completed: {today} </span>
        </h3>
        <div>
          <button onClick={handleCrossOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // if edit is clicked (set to true) then show form jsx to edit item
  //refactor below into itemEdit component
  // show edit form and also show original item.item in the form placeholder
  if (showEdit) {
    content = (
      <ItemEdit item={item} setShowEdit={setShowEdit} onEdit={onEdit} />
    );
  }

  return (
    <div className="h-14 bg-gradient-to-r m-6">
      <div className="border-2 rounded-lg p-2 h-18 bg-slate-200 hover:bg-slate-300 shadow-lg cursor-pointer max-sm:w-60 max-sm:p-4">
        <div className="flex justify-between">
          {/* inject content from above here */}
          {content}
        </div>

        <div className="flex gap-3">
          <button onClick={handleEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          {selected}
        </div>
      </div>
    </div>
  );
};

export default ItemShow;
