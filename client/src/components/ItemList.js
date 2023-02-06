import React from "react";
import ItemShow from "./ItemShow";
const ItemList = ({
  items,
  onDelete,
  onEdit,
  onComplete,
  onTogglePersonOne,
  onTogglePersonTwo,
}) => {
  // variable to return the individual item in the object in a jsx list element
  const listItems = items.map((item) => {
    // guard clause to prevent empty strings from being added
    if (item.item !== "") {
      return (
        <ItemShow
          item={item}
          key={item._id}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
          onTogglePersonOne={onTogglePersonOne}
          onTogglePersonTwo={onTogglePersonTwo}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <div className="max-sm:flex max-sm:justify-center max-sm:mb-4">
      <ul className="grid grid-cols-2 mb-5 max-sm:gap-14 max-sm:grid-cols-1 max-sm:mb-20 ">
        {listItems}
      </ul>
    </div>
  );
};

export default ItemList;
